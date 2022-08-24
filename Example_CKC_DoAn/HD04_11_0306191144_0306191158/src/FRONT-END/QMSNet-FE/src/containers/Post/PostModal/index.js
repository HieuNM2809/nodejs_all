import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Popover, Row, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoreIcon, SaveIcon } from '../../../assets/icon'
import AvatarCard from '../../../components/Common/AvatarCard'
import Carousel from '../../../components/Common/Carousel'
import Comment from '../../../components/Common/Comment'
import CommentInput from '../../../components/Common/CommentInput'
import PostAction from '../../../components/Common/PostAction'
import PostHeading from '../../../components/Common/PostHeading'
import { deletePost, getPost, toggleModal } from '../../../redux/post/action'
import { timeAgo } from '../../../utils/time_utils'
import { PostModalWrapper } from './PostModal.style'

const PostModal = props => {
    const { postDetail, postDetailLoading } = useSelector((state) => state.post)
    const { user } = useSelector((state) => state.auth)
    const isSimplePost = postDetail?.styles?.background === '#fff' && postDetail?.media?.length === 0;
    const dispatch = useDispatch();
    const [reply, setReply] = useState(null);


    useEffect(() => {
        if (props?.id !== postDetail?._id) {
            dispatch(getPost(props?.id))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.id])

    useEffect(() => {
        if (props.id === postDetail?._id && props.params) {
            const cmtE = document.getElementById(props.params)
            cmtE?.classList?.add('color-change');
            cmtE?.scrollIntoView(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postDetail])

    const handleOnReplyClick = (value) => {
        setReply(value)
    }
    return (
        <PostModalWrapper gutter={[32, 32]}>

            {postDetailLoading ?
                <>

                    {!isSimplePost && <Col span={14} className="left">
                        <Skeleton.Avatar loading={true} size={"large"} shape={"square"} />
                    </Col>}
                    <Col span={isSimplePost ? 24 : 2} className="right">
                        <Skeleton avatar paragraph={{ rows: 10 }} />
                    </Col>
                </>
                : <> {!isSimplePost && <Col xl={14} md={14} sm={24} xs={24} className="left">
                    {postDetail?.styles?.background !== "#ffffff" ? <div style={postDetail?.styles} className="content-with-style">
                        {postDetail?.content}
                    </div>
                        :
                        <Carousel controlColor='white' media={postDetail?.media} />
                    }
                </Col>}
                    <Col xl={isSimplePost ? 24 : 10} md={isSimplePost ? 24 : 10} sm={24} xs={24} className="right">
                        <AvatarCard className="post-detail-header" src={postDetail?.user?.avatar?.url} content={
                            <PostHeading style={{
                                padding: '1rem 0'
                            }} post={postDetail} />
                        } />

                        <div className="comments">
                            {postDetail?.content && postDetail.styles.background === '#ffffff' &&
                                <Comment simple={false} comment={{
                                    user: postDetail?.user,
                                    createdAt: postDetail?.createdAt,
                                    content: postDetail?.content

                                }} onlyTime={true} />}
                            {postDetail?.comments?.filter((cmt => !cmt.reply && cmt?.user && !cmt?.user?.blocks.includes(user._id) && !user?.blocks.includes(cmt?.user?._id)))?.map((cmt) => <Comment onReply={handleOnReplyClick} simple={false} params={props.params} isPostDetail={true} comment={cmt} />)}
                        </div>
                        <PostAction setReply={setReply} isPostDetail={true} post={postDetail} />
                        <CommentInput setReply={setReply} reply={reply} post={postDetail} isPostDetail={true} />
                    </Col></>}

        </PostModalWrapper>
    )
}

PostModal.propTypes = {}

export default PostModal