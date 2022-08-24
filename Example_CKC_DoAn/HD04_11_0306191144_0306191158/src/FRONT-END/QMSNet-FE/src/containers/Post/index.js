import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd';
import { setDetailModal, setPostDetail } from '../../redux/post/action';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/auth/reducer';
import { useNavigate, useParams } from 'react-router-dom';

const PostPage = props => {
    const { isLogin } = useSelector(authSelector);
    const { postDetail } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!postDetail) {
            dispatch(setDetailModal(params.slug))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.slug])

    useEffect(() => {
        if (isLogin && !postDetail) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postDetail])
    return (
        <></>
    )
}

PostPage.propTypes = {}

export default PostPage