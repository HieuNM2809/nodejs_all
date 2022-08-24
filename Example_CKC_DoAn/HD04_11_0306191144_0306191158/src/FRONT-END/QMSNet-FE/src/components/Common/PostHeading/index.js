import { CommentOutlined, DeleteOutlined, EditOutlined, GlobalOutlined, UnlockOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Popover, Row } from 'antd'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { MoreIcon, SaveIcon, UnsaveIcon } from '../../../assets/icon'
import { deletePost, postAction, toggleModal } from '../../../redux/post/action'
import { setUserDetail } from '../../../redux/user/action'
import { timeAgo } from '../../../utils/time_utils'
import ReportModal from '../ReportModal'

const PostHeadingWrapper = styled.div`
.info{
    .createdAt{
        display: flex;
        align-items: center;
        gap: 5px;
        font-size:13px;
    }
    img,svg{
        width: 12px;
        height: 12px;
    }
}

`;

const PostHeading = ({ post, style, hiddenAction }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const [isShowPopover, setIsShowPopover] = useState(false);
    const [isShowReportModal, setIsShowReportModal] = useState(false);
    const popoverRef = useRef(null);
    const { user } = useSelector(state => state.auth);
    const isSaved = user?.saved?.includes(post?._id);
    const dispatch = useDispatch();
    const handleSavePost = () => {

        dispatch(postAction({
            type: isSaved ? 'unsave' : 'save',
            id: post?._id,
        }))
    }
    return (
        <>
            <ReportModal visible={isShowReportModal} setVisible={setIsShowReportModal} type="C" />
            <PostHeadingWrapper style={style}>
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
                <Row align="middle" justify="space-between">
                    <div className="info">
                        <div onClick={() => {
                            dispatch(setUserDetail(post?.user));
                        }} className="username">{post?.user?.username} <i style={{
                            backgroundImage: "url('/assets/images/blue-check.png')",
                            backgroundSize: '15px',
                            width: '15px',
                            height: '15px',
                            display: post?.user?.isAdmin ? "inline-block" : "none"
                        }}></i></div>
                        <div className="createdAt">{timeAgo(post?.createdAt)} - {post?.status === 1 ? <GlobalOutlined /> : <img src="/assets/images/key.png" alt="key" />} </div>
                    </div>
                    <div className="event">
                        <input style={{
                            width: '0',
                            height: '0',
                            border: 'unset'
                        }} ref={popoverRef} onBlur={() => {
                            setIsShowPopover(false)
                        }} type="text" id="more-actions" />
                        <label htmlFor="more-actions" >
                            <Popover visible={isShowPopover} overlayClassName='postActions' placement="leftTop" content={<>
                                <div className="postActions" >
                                    <Row onMouseDown={handleSavePost}>
                                        <Col>
                                            {isSaved ? <UnsaveIcon /> : <SaveIcon />}
                                        </Col>
                                        <Col>
                                            {isSaved ? 'Bỏ lưu bài viết' : "Lưu bài viết"}
                                        </Col>
                                    </Row>
                                    {user?._id === post?.user?._id && <Row onMouseDown={() => {
                                        dispatch(toggleModal(post))
                                    }}>
                                        <Col>
                                            <EditOutlined />
                                        </Col>
                                        <Col>
                                            Chỉnh sửa bài viết
                                        </Col>
                                    </Row>}
                                    {user?._id === post?.user?._id && <Row onMouseDown={() => {
                                        dispatch(postAction({
                                            type: 'disableComment',
                                            id: post?._id,
                                            isPostDetail: true,
                                        }))
                                    }}>
                                        <Col>
                                            {post?.disableComment ? <UnlockOutlined /> : <CommentOutlined />}
                                        </Col>
                                        <Col>
                                            {post?.disableComment ? 'Mở bình luận' : 'Tắt bình luận'}

                                        </Col>
                                    </Row>}
                                    {user?._id === post?.user?._id && <Row onMouseDown={() => {
                                        setShowConfirmDelete(post)
                                    }}>
                                        <Col>
                                            <DeleteOutlined />
                                        </Col>
                                        <Col>
                                            Xóa bài viết
                                        </Col>
                                    </Row>}
                                    {user?._id !== post?.user?._id && <Row onMouseDown={() => {
                                        setIsShowReportModal({ post: post._id, user: post.user._id })
                                    }}>
                                        <Col>
                                            <WarningOutlined />
                                        </Col>
                                        <Col>
                                            Báo cáo bài viết
                                        </Col>
                                    </Row>}
                                </div>
                            </>} trigger="click">
                                {!hiddenAction && <MoreIcon onClick={() => {
                                    popoverRef.current.focus();
                                    setIsShowPopover(true)
                                }} style={{
                                    cursor: 'pointer'
                                }} />}
                            </Popover>
                        </label>

                    </div>
                </Row>
            </PostHeadingWrapper>
        </>
    )
}

PostHeading.propTypes = {}

export default PostHeading