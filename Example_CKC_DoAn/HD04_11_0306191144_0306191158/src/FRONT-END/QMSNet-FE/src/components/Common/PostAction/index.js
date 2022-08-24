import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { CommentIcon, DirectIcon, LikeIcon, SaveIcon, UnlikeIcon, UnsaveIcon } from '../../../assets/icon';
import { postAction, setDetailModal } from '../../../redux/post/action';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
const PostActionWrapper = styled.div`
border-top: 1px solid rgba(0,0,0,0.2);
.actions{
    padding: 1.5rem 0 .5rem 0;
    svg{
        width: 26px;
        height: 26px;
        cursor: pointer;
    }
}

.stats{
    font-weight: 600;
    font-size:1.4rem;
}
`;

const PostAction = ({ post, isPostDetail, setReply }) => {
    const { user } = useSelector((state) => state.auth);
    const [isLiked, setIsLiked] = useState(!!post?.likes?.includes(user?._id))
    const [isSaved, setIsSaves] = useState(() => {
        return user?.saved?.includes(post?._id);

    })

    useEffect(() => {
        setIsSaves(user?.saved?.includes(post?._id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.saved])

    const dispatch = useDispatch();
    return (<PostActionWrapper>
        <Row justify="space-between" align="middle" className="actions">
            <Col >
                <Row gutter={[14, 14]}>
                    <Col>

                        {isLiked ? <UnlikeIcon className="jello-horizontal" onClick={() => {
                            setIsLiked(!isLiked);
                            dispatch(postAction({
                                type: 'unlike',
                                id: post?._id,
                            }))
                        }} /> : <LikeIcon onClick={() => {
                            setIsLiked(!isLiked);
                            dispatch(postAction({
                                type: 'like',
                                id: post?._id,
                            }))
                        }} />}

                    </Col>
                    <Col>
                        <CommentIcon onClick={() => {
                            if (setReply) {
                                setReply(null)
                            } else {

                                dispatch(setDetailModal(post?._id))
                            }

                        }} />
                    </Col>
                    <Col>
                        <a href={`https://www.facebook.com/sharer/sharer.php?t=quanquan&u=${process.env.REACT_APP_CLIENT_SERVER}/posts/${post?._id}`} target="_blank"><DirectIcon >
                        </DirectIcon></a>
                    </Col>
                </Row>

            </Col>
            <Col >
                {isSaved ? <UnsaveIcon onClick={() => {
                    setIsSaves(!isSaved);

                    dispatch(postAction({
                        type: 'unsave',
                        id: post?._id,
                        isPostDetail,
                    }))
                }} /> :
                    <SaveIcon onClick={() => {
                        setIsSaves(!isSaved);
                        dispatch(postAction({
                            type: 'save',
                            id: post?._id,
                            isPostDetail,
                        }))
                    }} />}
            </Col>
        </Row>
        <Row className="stats">
            <Col span={24}>
                {post?.likes?.length === 0 ? ' Hãy là người đầu tiên thích bài viết này ' : post?.likes?.length + ` lượt thích`}
            </Col>
        </Row>
    </PostActionWrapper>
    )
}

PostAction.propTypes = {}

export default PostAction