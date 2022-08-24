import { Button, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetail, userFollow } from '../../../redux/user/action'
import AvatarCard from '../AvatarCard'
import { RequestWrapper } from './Request.style'

const Request = ({ data, suggestion, showFullName }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.auth)
    const { followLoading } = useSelector(state => state.user)
    const isFollowed = user.following.includes(data._id);

    useEffect(() => {
        if (loading) {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [followLoading])
    return (
        <RequestWrapper>
            <AvatarCard style={{
                alignItems: 'center',
            }} src={data?.avatar?.url} alt={data?.avatar?.url}
                content={
                    <Row gutter={[12, 12]} wrap={false} justify="space-between" align="middle" >
                        <Col>
                            <div className="username" onClick={() => {
                                dispatch(setUserDetail(data))
                            }}>
                                {(!data?.deleted && data?.status === 'A') ? data?.username : 'Người dùng QMNets'}
                            </div>
                            <span>
                                {(!data?.deleted && data?.status === 'A') && (showFullName ? data.fullname : suggestion ? 'Gợi ý cho bạn.' : 'đã theo dõi bạn.')}
                            </span>
                        </Col>
                        {(!data?.deleted && data?.status === 'A') && <Col style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            {data?._id === user?._id ? <Button onClick={() => {
                                dispatch(setUserDetail(user))

                            }} className="q-button" type="primary" >Trang cá nhân</Button> : isFollowed ? <Button onClick={() => {
                                setLoading(true)
                                dispatch(userFollow({
                                    path: 'unfollow' + '/' + data?._id,
                                    simple: true
                                }))

                            }} className="q-button" type="primary" >Bỏ theo dõi</Button> : !suggestion ? <Button onClick={() => {
                                setLoading(true)
                                dispatch(userFollow({
                                    path: 'follow' + '/' + data?._id,
                                    simple: true
                                }))
                            }} className="q-button q-button-outline" >Theo dõi lại</Button> : <Button onClick={() => {
                                setLoading(true)
                                dispatch(userFollow({
                                    path: 'follow' + '/' + data?._id,
                                    simple: true
                                }))
                            }} className="q-button" type="primary" >Theo dõi</Button>}

                        </Col>}

                    </Row>
                }
            >

            </AvatarCard>
        </RequestWrapper >
    )
}

Request.propTypes = {}

export default Request