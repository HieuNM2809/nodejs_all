import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { setUserDetail } from '../../../../redux/user/action'

const BlockItemWrapper = styled(Row)`
img{
    width: 50px;
   height: 50px;
   border-radius: 50%;
   border: thin solid rgba(0,0,0,0.1);
   display: inline-block;
   margin-right: 1rem;
}   
&:hover{
    background: rgba(0,0,0,0.06);
}
padding: 1rem;
border-radius:5px;
cursor: pointer;
margin-top: 1rem;
.username{
    display: inline-block;
}

`;

const BlockItem = ({ user, onUnBlock }) => {
    const { user: account } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <BlockItemWrapper align="middle" justify="space-between">
            <Col>
                <img src={user?.avatar?.url} alt={user?.avatar?.url} />
                <div className="username">{user?.username}</div>
            </Col>
            <Col>
                {account.blocks.includes(user?._id) ? <Button onClick={() => onUnBlock(user._id)} className='q-button q-button-outline'>
                    Hủy chặn
                </Button> : <Button type="primary" className="q-button" onClick={() => dispatch(setUserDetail(user))} >
                    Đi tới trang cá nhân
                </Button>}

            </Col>
        </BlockItemWrapper>
    )
}

BlockItem.propTypes = {}

export default BlockItem