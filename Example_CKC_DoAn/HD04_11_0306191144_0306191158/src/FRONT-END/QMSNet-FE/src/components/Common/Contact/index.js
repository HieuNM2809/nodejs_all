import { Badge, Col, Row } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { openConversation } from '../../../redux/conversation/action'
import { setUserDetail } from '../../../redux/user/action'
import AvatarCard from '../AvatarCard'
import { ContactWrapper } from './Contact.style'

const Contact = props => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const contact = props.data.participants.find((p) => p._id !== user?._id);

    return (

        <ContactWrapper >
            <Row className="pseudo">
                <Col span={8}>
                    <div className="dot"></div>
                    <Badge dot status="success" offset={[-20, 80]}>
                        <img src={contact?.avatar?.url} alt={contact?.avatar?.url} />
                    </Badge>
                </Col>
                <Col span={16}>
                    <div className="username" >
                        <span className="name" onClick={() => {
                            dispatch(setUserDetail(contact))
                        }}>{contact?.username}</span>  <span className="fullname">
                            ({contact?.fullname})
                            <i style={{
                                backgroundImage: "url('/assets/images/blue-check.png')",
                                backgroundSize: '15px',
                                width: '15px',
                                height: '15px',
                                display: contact?.isAdmin ? "inline-block" : "none"
                            }}></i>
                        </span>
                    </div>

                    {(contact?.userSettings?.PRIVACY?.email === 1 || !contact?.userSettings?.PRIVACY?.email) && <div className="email">
                        <img src="/assets/images/mail.png" alt="mail" />
                        {contact?.email}
                    </div>}
                    {(!contact?.userSettings?.PRIVACY?.followers || contact?.userSettings?.PRIVACY?.followers === 1) && <div className="stats">
                        <img src="/assets/images/followers.png" alt="followers" />
                        Có <span>{contact?.followers?.length}</span> đang theo dõi.
                    </div>}
                    {(!contact?.userSettings?.PRIVACY?.following || contact?.userSettings?.PRIVACY?.following === 1) && <div className="stats">
                        <img src="/assets/images/followers.png" alt="followers" />
                        Đang theo dõi <span>{contact?.following?.length}</span> người.
                    </div>}
                    <div className="stats">
                        <img src="/assets/images/joined.png" alt="joined" />
                        Tham gia vào {moment(contact?.createdAt).format('MM, YYYY')}
                    </div>

                </Col>
            </Row>
            <AvatarCard onClick={() => {
                dispatch(openConversation(props.data._id))
            }} showDot src={contact?.avatar?.url} style={{
                alignItems: 'center'
            }} content={<>

                <Row justify="space-between" align="middle">
                    <div className="username" style={{
                        color: 'black',
                        fontWeight: '500',
                        textDecoration: 'none',
                    }}>
                        {contact?.username}
                    </div>

                </Row>
            </>
            }>

            </AvatarCard>
        </ContactWrapper>
    )
}

Contact.propTypes = {}

export default Contact