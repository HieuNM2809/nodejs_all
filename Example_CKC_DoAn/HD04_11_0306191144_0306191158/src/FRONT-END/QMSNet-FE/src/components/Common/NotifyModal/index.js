import React from 'react'
import PropTypes from 'prop-types'
import { NotifyModalWrapper } from './NotifyModal.style'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifyModal } from '../../../redux/app/action'
import { sendMail } from '../../../redux/auth/action'

const NotifyModal = (props) => {
    const { notify } = useSelector(state => state.app);
    const { loading } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const handleModalClose = () => {
        dispatch(setNotifyModal(null))
    }
    return (
        <>

            {notify && <NotifyModalWrapper >
                <div className="content scale-in-center">
                    <CloseOutlined onClick={handleModalClose} />
                    {!notify?.success ? <img className="action-image" src="/assets/images/error.png" alt="error" /> : <img className="action-image success" src="/assets/images/success.png" alt="success" />}
                    <div className="title">
                        {!notify?.success ? 'Thất bại rồi! :(' : 'Thành công!'}
                    </div>
                    <div className="message">
                        {notify?.message}
                    </div>
                    {notify?.data?.password && <div className="copyPass">
                        {notify?.data?.password}
                    </div>}
                    <div className="actions">
                        {notify?.code === 403 ? <Button loading={loading} onClick={() => {
                            setNotifyModal(null)
                            dispatch(sendMail({
                                email: notify.data.email
                            }))
                        }} size="large" className="q-button q-button-success" type="primary">Nhận email kích hoạt</Button> :
                            <Button onClick={handleModalClose} size="large" type="primary" className="q-button">
                                Đóng
                            </Button>
                        }

                    </div>
                </div>
            </NotifyModalWrapper>}
        </>
    )
}

NotifyModal.propTypes = {}

export default NotifyModal