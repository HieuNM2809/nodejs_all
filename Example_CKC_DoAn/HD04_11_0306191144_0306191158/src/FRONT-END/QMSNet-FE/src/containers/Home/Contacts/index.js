import React from 'react'
import PropTypes from 'prop-types'
import { ContactsWrapper } from './Contacts.style'
import { Badge, Row } from 'antd'
import Contact from '../../../components/Common/Contact'
import { useSelector } from 'react-redux'

const Contacts = props => {
    const { data } = useSelector(state => state.online);
    return (
        <ContactsWrapper>
            <Row justify="space-between" align="middle" className="heading">
                <div className="section-title">
                    Người liên hệ
                </div>
                <Badge count={data?.length} style={{
                    background: 'green',
                }}></Badge>
            </Row>
            <div className="contacts">
                {
                    data?.map((ct) => <Contact data={ct} />)
                }
            </div>
        </ContactsWrapper>
    )
}

Contacts.propTypes = {}

export default Contacts