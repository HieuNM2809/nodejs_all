import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Col, Popover, Row } from 'antd';
import { MoreIcon, UnsaveIcon } from '../../../../assets/icon';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { postAction, setDetailModal, setPostDetail } from '../../../../redux/post/action';

const SavedItemWrapper = styled.div`
padding: 1rem;
border: thin solid rgba(0,0,0,0.15);
border-radius: 10px;
background: white;
&+&{
    margin-top: 1rem;
}
    .main-image{
        width: 100%;
        object-fit:contain;

    }

    .content{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 2rem;
        font-weight: bold;

    }
    
    .info{
        margin: 1.5rem 0;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 30px;
            border: thin solid rgba(0,0,0,0.2);
            border-radius:50%;

        }
    }

    .sub{
        b{
            font-weight: 500;
        }
    }

    .actions{
        display: flex;
        gap: 1rem;
    }
`;
const SavedItem = ({ post }) => {

    const popoverRef = useRef();
    const [isShowPopover, setIsShowPopover] = useState();
    const dispatch = useDispatch();

    return (
        <SavedItemWrapper>
            <Row gutter={[32, 32]} align="middle">
                <Col xl={4} md={4} sm={6} sx={8}>
                    <img className="main-image" src={post?.media[0]?.url.includes('/image/') ? post?.media[0]?.url : post?.user?.avatar?.url} alt="logo" />
                </Col>
                <Col xl={18} md={18} sm={16} sx={14}>
                    <div className="content">
                        {post?.content || 'Bài viết hình ảnh, video'}
                    </div>
                    <div className="info">
                        <img src={post?.user?.avatar?.url} alt="saved" />
                        <div className="sub">Đã lưu từ <b>bài viết của {post?.user?.username}</b></div>
                    </div>
                    <div className="actions">
                        <Button size="large" onClick={() => {
                            dispatch(setDetailModal(post._id
                            ))
                        }} className="q-button q-button-outline">
                            Xem bài viết
                        </Button>

                        <input style={{
                            width: '0',
                            height: '0',
                            border: 'unset'
                        }} ref={popoverRef} onBlur={() => {
                            setIsShowPopover(false)
                        }} type="text" id="more-actions" />
                        <label htmlFor="more-actions" >
                            <Popover visible={isShowPopover} overlayClassName='postActions' placement="top" content={<>
                                <div className="postActions" >
                                    <Row onMouseDown={() => {
                                        dispatch(postAction({
                                            type: 'unsave',
                                            id: post?._id,
                                        }))
                                    }}>
                                        <Col>
                                            <UnsaveIcon />
                                        </Col>
                                        <Col>
                                            Bỏ lưu bài viết
                                        </Col>
                                    </Row>
                                </div>
                            </>} trigger="click">
                                <Button onClick={() => {
                                    popoverRef.current.focus();
                                    setIsShowPopover(true)
                                }} size="large" className="q-button q-button-outline">
                                    <MoreIcon style={{
                                        cursor: 'pointer'
                                    }} />
                                </Button>
                            </Popover>
                        </label>
                    </div>
                </Col>
            </Row>
        </SavedItemWrapper>
    )
}

SavedItem.propTypes = {}

export default SavedItem