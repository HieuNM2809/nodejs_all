import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import axiosClient from '../../../api/axiosClient'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import Request from '../Request'

const FollowModal = ({ visible, title, setVisible, userIds }) => {
    const [loading, setLoading] = useState(false);
    const { user: account } = useSelector(state => state.auth);
    const initialState = {
        users: [],
        pagination: {
            page: 0,
            limit: 10,
            count: 10,
        }
    };
    const [data, setData] = useState(initialState)

    const fetchApi = async () => {
        setLoading(true)
        try {
            const res = await axiosClient.post(`/users/getAll?page=${Number(data.pagination.page) + 1}&limit=${data.pagination.limit}`, {
                userIds: userIds
            });
            if (res.success) {
                setLoading(false)
                setData((current) => ({
                    ...res.data, users: [...current.users, ...res.data.users]
                }));
            }
        } catch (error) {
            setLoading(false)
        }
    }

    const handleOnScrollBot = (e) => {
        if (Number(data?.pagination?.count) === Number(data?.pagination?.limit)) {

            if (Math.ceil(e.target.offsetHeight + e.target.scrollTop) >= e.target.scrollHeight) {
                fetchApi()
            }
        }
    }
    useEffect(() => {
        if (visible) {

            fetchApi();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible])
    return (
        <Modal centered destroyOnClose={true} afterClose={() => {
            setLoading(false)
            setData(initialState)
        }} className="follow-modal" visible={visible} onCancel={() => {
            setVisible({
                visible: false,
                title: '',
                userIds: null
            })
        }} title={title} footer={null}>
            <div className="follows" onScroll={handleOnScrollBot}>
                {data?.users?.map((user) => <Request data={user} suggestion={!account.followers.includes(user?._id)} showFullName />)}
                <Loader loading={loading} />
            </div>
        </Modal>
    )
}

FollowModal.propTypes = {}

export default FollowModal