import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { NotifiesWrapper } from './Notifies.style'
import Notify from '../Notify';
import { useDispatch, useSelector } from 'react-redux'
import { getNotify, readNotifyAll } from '../../../../../redux/notify/action';

const notifyTypes = [{
    label: 'Tất cả',
    key: 'all'
},
{
    label: 'Chưa đọc',
    key: 'unRead'
},
]

const Notifies = props => {
    const [notifyType, setNotifyType] = useState(notifyTypes[0].key)
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.notify)
    const [notifies, setNotifies] = useState(data);
    useEffect(() => {
        dispatch(getNotify())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (notifyType === "all") {
            setNotifies(data);
        } else {
            const unReads = data?.filter((n) => !n?.isRead);
            setNotifies(unReads);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notifyType, data])


    return (
        <NotifiesWrapper >
            <div className="title">
                Thông báo
            </div>
            <div className="notify-type">
                {notifyTypes?.map((n) =>
                (<div key={n.key} onClick={() => {
                    if (n.key !== notifyType) {
                        setNotifyType(n.key)
                    }
                }} className={`type ${n.key === notifyType ? "active" : ""}`}>{n.label}</div>)
                )}
            </div>
            <div className="notify-history">
                <div className="notify-history-title">
                    Mới đây
                </div>
                <div className="notify-history-remove" onClick={() => dispatch(readNotifyAll())}>
                    Đọc tất cả
                </div>
            </div>
            <div className="notify-list">
                {notifies?.map((n, index) => <Notify key={n?._id || index} notify={n} />)}
            </div>
        </NotifiesWrapper>
    )
}

Notifies.propTypes = {}

export default Notifies