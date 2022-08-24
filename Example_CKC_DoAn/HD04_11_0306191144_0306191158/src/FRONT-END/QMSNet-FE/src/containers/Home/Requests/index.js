import { Badge, Button, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Request from '../../../components/Common/Request'
import { RequestsWrapper } from './Requests.style'

const Requests = props => {
  const { suggestions, requests } = useSelector(state => state.user)
  return (
    <RequestsWrapper>
      <Row style={{
        marginTop: '4rem'
      }} align="middle" justify="space-between" className="heading">
        <div className="section-title" >
          Gợi ý cho bạn
        </div>
        <Link to="/friend">Xem tất cả</Link>

      </Row>
      <div className="requests">
        {requests?.users?.slice(requests?.users?.length - 2,
          requests?.users?.length).map((rq, index) => <Request key={rq?._id || index} data={rq} />)}
        {suggestions?.users?.slice(suggestions?.users?.length - 2,
          suggestions?.users?.length).map((rq, index) => <Request key={rq?._id || index} data={rq} suggestion />)}
      </div>
    </RequestsWrapper>
  )
}

Requests.propTypes = {}

export default Requests