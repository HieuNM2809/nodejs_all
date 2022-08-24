import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../../api/axiosClient'
import { openErrorNotifyModal, openSuccessNotifyModal } from '../../../utils/notifyModal'
import { Modal } from 'antd'
import { setNotifyModal } from '../../../redux/app/action'

const Verify = props => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const FetchVerify = async () => {
            try {
                const res = await axiosClient.get(`/verify/${params?.id}`);
                if (res.success) {
                    navigate('/signin');
                    dispatch(setNotifyModal(res))
                }
            } catch (error) {
                navigate('/signin');
                dispatch(setNotifyModal(error))
            }
        }
        FetchVerify();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div style={{
            height: '30rem',
        }}>
        </div>
    )
}

Verify.propTypes = {}

export default Verify