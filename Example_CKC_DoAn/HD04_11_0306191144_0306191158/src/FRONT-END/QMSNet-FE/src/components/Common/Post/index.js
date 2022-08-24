import { DeleteOutlined, EditOutlined, GlobalOutlined, SaveOutlined } from '@ant-design/icons'
import { Popover, Row, Col, Modal, Button } from 'antd'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoreIcon, SaveIcon } from '../../../assets/icon'
import { deleteMessage } from '../../../redux/conversation/action'
import { deletePost, setDetailModal, toggleModal } from '../../../redux/post/action'
import { setUserDetail } from '../../../redux/user/action'
import { timeAgo } from '../../../utils/time_utils'
import AvatarCard from '../AvatarCard'
import Box from '../Box'
import Carousel from '../Carousel'
import Comment from '../Comment'
import CommentInput from '../CommentInput'
import PostAction from '../PostAction'
import PostHeading from '../PostHeading'
import { PostWrapper } from './Post.style'


const Post = ({ post }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [readMore, setReadMore] = useState(false);
    return (<>
        <Modal centered bodyStyle={{
            fontSize: '16px'
        }} visible={showConfirmDelete} footer={<Row justify="end">
            <Button size="large" onClick={() => {
                setShowConfirmDelete(null)
            }} style={{
                fontWeight: '600'
            }} type="link">Hủy</Button>
            <Button size="large" className="q-button" onClick={() => {
                dispatch(deletePost(showConfirmDelete))
                setShowConfirmDelete(null);
            }} type="primary">Xóa</Button>
        </Row>} onCancel={() => {
            setShowConfirmDelete(null)
        }} destroyOnClose={true} title="Bạn có muốn xóa bài viết này?">
            Chúng tôi sẽ gỡ bài viết này và bạn sẽ không thể khôi phục nó.
        </Modal>
        <PostWrapper>

            <Box className={'post__container'}>
                <AvatarCard style={{
                    alignItems: 'center'
                }} src={post?.user?.avatar?.url} content={
                    <PostHeading post={post} />
                }>

                    <div style={{
                        background: post?.styles?.background,
                        color: post?.styles?.color,
                    }} className={`text-content ${!readMore && post?.styles?.background === "#ffffff" && 'collapse'}  ${post?.styles?.background !== "#ffffff" && 'with-style'}`} >
                        {post?.content}
                    </div>
                    {!readMore && (post?.content?.split('\n') || [])?.length > 3 && <span onClick={() => {
                        setReadMore(true)
                    }} style={{
                        cursor: 'pointer',
                        fontSize: '15px',
                        display: 'inline-block',
                        fontWeight: '500',
                        marginBottom: '10px'
                    }}>Xem thêm</span>}
                    <Carousel media={post?.media} />
                    <PostAction post={post} />

                    <div className="post__comment">
                        {post?.comments?.length > 0 ? <div className="post__comment__stats" onClick={() => {
                            dispatch(setDetailModal(post?._id))
                        }}>
                            Xem tất cả {post?.comments?.length} bình luận
                        </div> : <div className="post__comment__stats">
                            Hãy là người đầu tiên bình luận bài viết này
                        </div>}

                        {post?.comments?.slice(
                            post.comments.length - 2,
                            post.comments.length
                        )?.map((cmt) => cmt?.user && !cmt?.user?.blocks.includes(user?._id) && !user?.blocks.includes(cmt?.user?._id) && cmt?.user?.status === 'A' && <Comment key={cmt?._id} comment={cmt} />)}

                    </div>
                    <CommentInput isPostUser post={post} />

                </AvatarCard>
            </Box>
        </PostWrapper>
    </>
    )
}

CommentInput.propTypes = {
    post: PropTypes.object
}


export default Post