import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '../../../components/Common/Box'
import Layout from '../../../components/Common/Layout'
import Loader from '../../../components/Common/Loader'
import { POST, postEndpoint } from '../../../constants'
import callAPi from '../../../utils/apiRequest'
import { SavedWrapper } from './Saved.style'
import SavedItem from './SavedItem'

const Saved = () => {
    const { user } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        posts: [],
        pagination: {
            page: 0,
            limit: 10,
        },
    });

    const fetch = async (reset) => {
        setLoading(true);
        if (reset) {
            setData({
                posts: [],
                pagination: {
                    page: 0,
                    limit: 10,
                },
            });
        }
        try {

            const res = await callAPi(postEndpoint.POSTS + `getSavedByUser?page=${reset ? 1 : Number(data?.pagination?.page) + 1}&limit=${data?.pagination?.limit}`, POST, {
                postIds: user.saved
            })
            if (res && res.success) {
                setLoading(false);
                setData((current) => ({ ...res.data, posts: [...current.posts, ...res.data.posts] }))
            }

        } catch (error) {
            setLoading(false);
        }

    }
    useEffect(() => {
        fetch(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    return (
        <Layout>
            <SavedWrapper>
                {data?.posts?.map((p) => <SavedItem post={p} />)}
                {data?.posts?.length < 1 && <Box style={{
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: '16px'
                }}>Bạn chưa lưu bài viết nào.</Box>}
                <Loader loading={loading} />
                {data?.pagination?.count === 10 && <Button style={{
                    width: '100%',
                    marginTop: '2rem'
                }} size="large" className="q-button" onClick={fetch} type="primary">Xem thêm</Button>}
            </SavedWrapper>
        </Layout>
    )
}

export default Saved