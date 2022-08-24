const createRes = require('../../utils/response_utils');
const Comments = require('../modules/comment');
const Posts = require('../modules/post');
const Notifies = require('../modules/notify');

const CommentController = {
    createComment: async (req, res, next) => {
        try {
            const comment = req.body;
            const post = await Posts.findOne({ _id: comment.postId, disableComment: false, deleted: false }).populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '-password',
                },
            });
            if (!post)
                return next(createRes.error('Không có bài đăng này.'))
            if (post.user._id.toString() !== req.user._id.toString()) {
                if (post.status === 2) {
                    return next(createRes.error('Không có bài đăng này.'))

                }
            }
            comment.user = req.user._id;
            const commentCount = post.comments.reduce((pre, next) => {

                if (next.user._id.toString() !== post.user._id.toString() && next.user._id.toString() !== req.user._id.toString() && !pre.includes(next.user._id.toString())) {

                    return [...pre, next.user._id.toString()];
                }
                return [...pre];
            }, []);
            const newComment = new Comments({
                content: comment.content,
                user: req.user._id,
                postId: post._id,
                tag: comment?.tag,
                reply: comment?.reply,
            });
            await newComment.save();
            let newPost;
            if (newComment.user.toString() === post.user._id.toString() && !newComment?.reply) {
                newPost = await Posts.findOneAndUpdate(
                    { _id: comment.postId },
                    {
                        $push: { comments: newComment._id },
                    },
                    { new: true }
                )
                    .populate('user', '-password')
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'user',
                            select: '-password',
                        },
                    })
            } else if (!newComment?.reply) {
                const [res] = await Promise.all([Posts.findOneAndUpdate(
                    { _id: comment.postId },
                    {
                        $push: { comments: newComment._id },
                    },
                    { new: true }
                )
                    .populate('user', '-password')
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'user',
                            select: '-password',
                        },
                    }), Notifies.findOneAndUpdate({
                        postId: post._id,
                        action: 3,
                    }, {
                        commentId: newComment._id,
                        text: `${commentCount.length === 0 ? 'đã bình luận bài viết của bạn.' : `và ${commentCount.length} người khác đã bình luận bài viết của bạn.`} `,
                        content: newComment.content,
                        isRead: false,
                        recipients: [post.user],
                        user: req.user
                    }, {
                        upsert: true,
                    }
                    )])
                newPost = res;
            } else {
                const [res] = await Promise.all([Posts.findOneAndUpdate(
                    { _id: comment.postId },
                    {
                        $push: { comments: newComment._id },
                    },
                    { new: true }
                )
                    .populate('user', '-password')
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'user',
                            select: '-password',
                        },
                    }), Notifies.findOneAndUpdate({
                        postId: post._id,
                        action: 5,
                        replyId: newComment.reply,
                    }, {
                        commentId: newComment._id,
                        text: 'đã trả lời bình luận của bạn.',
                        content: newComment.content,
                        isRead: false,
                        recipients: [newComment.tag._id],
                        user: req.user
                    }, {
                        upsert: true,
                    }
                    )])
                newPost = res;
            }
            return res.status(200).json(createRes.success('Thành công', { post: newPost, comment: newComment }));
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteComment: async (req, res, next) => {
        try {
            const comment = await Comments.findOne({
                _id: req.params.id,
            });
            if (!comment)
                return next(createRes.error('Bình luận không tồn tại.'))
            let comments;
            if (!comment.reply) {
                comments = await Comments.find({
                    $or: [
                        {
                            _id: req.params.id,
                            user: req.user._id,
                        },
                        { reply: req.params.id },
                    ],
                });
            } else {
                comments = [comment._id]
            }

            await Comments.deleteMany({
                _id: { $in: comments },
            }, req.user._id);

            const post = await Posts.findOneAndUpdate(
                { _id: comments[0].postId },
                {
                    $pullAll: {
                        comments: comments,
                    },
                }
                , {
                    new: true,
                }
            ).populate('user', '-password')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user',
                        select: '-password',
                    }
                });

            return res.status(200).json(createRes.success('Thành công', { post }));
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    likeComment: async (req, res, next) => {
        const comment = await Comments.findOne({
            _id: req.params.id,
            likes: req.user._id,
        });
        if (comment) {
            return next(createRes.error('Bạn đã like bình luận này rồi.'))
        }

        const newComment = await Comments.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    likes: req.user._id,
                },
            })
        const isAuthorLiked = newComment.likes.includes(newComment.user);
        let post;
        if (newComment.user.equals(req.user._id)) {
            post = await Posts.findOne({ _id: newComment.postId }).populate('user', '-password')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user',
                        select: '-password',
                    },
                });
        } else {
            const [res] = await Promise.all([Posts.findOne({ _id: newComment.postId }).populate('user', '-password')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user',
                        select: '-password',
                    },
                }),
            Notifies.findOneAndUpdate({
                postId: newComment.postId,
                action: 4,
                commentId: newComment._id,
            }, {
                text: `${newComment.likes.length === 0 ? 'đã thích bình luận của bạn.' : newComment.likes.length === 1 ? isAuthorLiked ? 'đã thích bình luận của bạn.' : 'và 1 người khác đã thích bình luận của bạn.' : isAuthorLiked ? `và ${newComment.likes.length - 1} người khác đã thích bình luận của bạn.` : `và ${newComment.likes.length} người khác đã thích bình luận của bạn.`} `,
                content: newComment.content,
                isRead: false,
                recipients: [newComment.user],
                user: req.user
            }, {
                upsert: true,
            }

            )
            ])
            post = res;
        }
        return res.status(200).json(createRes.success('Thành công', { post, comment: newComment }));
    },
    unlikeComment: async (req, res, next) => {
        const comment = await Comments.findOne({
            _id: req.params.id,
            likes: req.user._id,
        });
        if (!comment)

            return next(createRes.error('Bạn chưa like bình luận này rồi.'))
        const newComment = await Comments.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    likes: req.user._id,
                },
            })
        const post = await Posts.findOne({ _id: newComment.postId }).populate('user', '-password')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: '-password',
                },
            });;
        return res.status(200).json(createRes.success('Thành công', { post, comment: newComment }));

    },
    getComment: async (req, res, next) => {
        try {
            const data = await Comments.find({
                postId: req.param.id
            }).populate({
                path: 'user',
                select: '-password',
            })

            const comments = data.filter((c) => !c.user.blocks.includes(req.user._id) && !req.user.blocks.includes(c.user._id))

            return res.status(200).json(createRes.success('Thành công', { comments }));


        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = CommentController;
