const mongoose = require('mongoose');
const createRes = require('../../utils/response_utils');
const Conversations = require('../modules/conversation');
const Messages = require('../modules/message');
const Users = require('../modules/user');

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
const MessageController = {
    createMessage: async (req, res, next) => {
        try {
            const { recipient, sender, text, media, call, icon } =
                req.body;
            if (!text && media?.length === 0 && !call && !icon) return;
            const currentRecipient = await Users.findOne({ _id: recipient._id, status: 'A', deleted: false });
            if (!currentRecipient || currentRecipient.deleted || currentRecipient.blocks.includes(sender))
                return next(createRes.error('Bạn không thể trả lời cuộc trò chuyện này.'))

            const newConversations = await Conversations.findOneAndUpdate(
                {
                    $or: [
                        { participants: [req.body.sender, req.body.recipient] },
                        { participants: [req.body.recipient, req.body.sender] },
                    ],


                },
                {
                    participants: [req.body.sender, req.body.recipient],
                    ...req.body,
                    media: media || null,
                    icon: icon || false,
                    text: text || '',
                    read: [req.user._id],
                    $pull: {
                        deletedBy: req.user._id
                    }
                },
                {
                    new: true,
                    upsert: true,
                }
            ).populate('participants', '-password');

            const newMessage = new Messages({
                conversation: newConversations._id,
                ...req.body
            });

            await newMessage.save();

            return res.json(createRes.success('Thành công', {
                conversation: newConversations,
                message: newMessage,
            }));
        } catch (error) {
            return next(error)
        }
    },

    getMessages: async (req, res, next) => {
        try {
            const feature = new APIFeatures(
                Messages.find({
                    conversation: req.params.id,
                    $or: [
                        {
                            recipient: req.user._id,
                        },
                        {
                            sender: req.user._id
                        }
                    ]
                }),
                req.query
            ).paginating();

            const messages = await feature.query
                .sort('-createdAt');

            return res.json(createRes.success('Thành công!', {
                _id: req.params.id,
                messages,
                pagination: { ...req.query, count: messages.length }
            }));
        } catch (error) {
            return next(error);
        }
    },
    updateConversation: async (req, res, next) => {
        try {
            const conversation = await Conversations.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $push: {
                        read: req.user._id
                    }
                },
                {
                    new: true,
                }
            )
                .populate('participants', '-password');



            res.json(createRes.success('Thành công!', conversation));
        } catch (error) {
            next(error);
        }
    },

    getConversations: async (req, res, next) => {
        try {
            const feature = new APIFeatures(
                Conversations.find({
                    participants: req.user._id,
                    deletedBy: {
                        $nin: req.user._id
                    }
                }),
                req.query
            ).paginating();

            const conversations = await feature.query
                .sort('-updatedAt')
                .populate('participants', '-password');
            return res.json(createRes.success('Thành công!', conversations,
            ))
        } catch (err) {
            return next(err);
        }
    },

    deleteMessage: async (req, res, next) => {
        const message = await Messages.findOne({ _id: req.params.id });
        if (!message)
            return next(createRes.error('Tin nhắn này không tồn tại.'))

        Messages.deleteById(
            message._id, req.user._id
        ).exec(async function (err, result) {
            if (err) {
                return next(err);
            }
            const newConversations = await Conversations.findOneAndUpdate(
                {
                    _id: message.conversation
                },
                {
                    text: `${req.user.username} đã gỡ 1 tin nhắn.`,
                },
                {
                    new: true,
                }
            ).populate('participants', '-password');

            return res.json(createRes.success('Thành công!', newConversations));
        });
    },
    deleteConversation: async (req, res) => {
        try {
            const idStr = req.user._id.toString();
            const cutId = idStr.slice(((idStr.length - 1) - (req.user.username.length)));
            const newId = Buffer.from(idStr.replace(cutId, req.user.username))
            await Promise.all([
                Messages.updateMany({
                    conversation: req.params.id,
                    sender: req.user._id
                }, {
                    sender: new mongoose.Types.ObjectId(newId)
                }, {
                    new: true

                }),
                Messages.updateMany({
                    conversation: req.params.id,
                    recipient: req.user._id
                }, {
                    recipient: new mongoose.Types.ObjectId(newId)
                }, {
                    new: true
                }), Conversations.findOneAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        $push: {
                            deletedBy: req.user._id
                        }

                    }
                )

            ])


            res.json(createRes.success('Xóa cuộc trò chuyện thành công!'));
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};

module.exports = MessageController;
