import { Button, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Common/Layout'
import Loader from '../../components/Common/Loader'
import RequestCard from '../../components/Common/RequestCard'
import { getUserRequests, getUserSuggestions } from '../../redux/user/action'
import { FriendWrapper } from './Friend.style'


const Friend = props => {
    const { suggestions, requests, suggestionLoading, requestLoading } = useSelector(state => state.user)
    const dispatch = useDispatch()


    return (
        <Layout>

            <FriendWrapper>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className="section-title">
                            Đang theo dõi bạn
                        </div>
                    </Col>

                </Row>
                <Row gutter={[32, 32]}>
                    {requests?.users?.map((user) => <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                        <RequestCard data={user} />
                    </Col>)}
                </Row>
                <Loader loading={requestLoading} />

                <Row>
                    {requests.pagination.count === 8 &&
                        <Button size="large" className="q-button q-button-outline" onClick={() => {
                            dispatch(getUserRequests())
                        }}>Xem thêm</Button>}
                </Row>

                <Row justify="space-between" align="middle">
                    <Col>
                        <div className="section-title">
                            Gợi ý theo dõi
                        </div>
                    </Col>

                </Row>
                <Row gutter={[32, 32]}>
                    {suggestions?.users?.map((user) => <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                        <RequestCard suggestions data={user} />
                    </Col>)}
                </Row>
                <Loader loading={suggestionLoading} />
                {suggestions.total === 8 && <Row>
                    <Button size="large" onClick={() => {
                        dispatch(getUserSuggestions())
                    }} className="q-button q-button-outline">Xem thêm</Button>
                </Row>}

            </FriendWrapper>
        </Layout>
    )
}

Friend.propTypes = {}

export default Friend