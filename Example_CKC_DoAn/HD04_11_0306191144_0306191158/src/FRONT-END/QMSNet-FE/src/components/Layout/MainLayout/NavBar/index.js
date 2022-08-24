import { Col, Row } from 'antd'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContactIcon, HomeIcon, MessageIcon, NotifyIcon, SearchIcon, SettingIcon } from '../../../../assets/icon'
import { setTabActive } from '../../../../redux/app/action'
import Conversation from './Conversation'
import { NavBarWrapper } from './NavBar.style'
import Notifies from './Notifies'
import Search from './Search'

const NavBarItem = props => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            {props.active && props.popup && <div onClick={() => {
                if (location.pathname === '/') {
                    dispatch(setTabActive('home'))
                } else {
                    dispatch(setTabActive(''))

                }
            }} className="pseudo"></div>}
            <Row gutter={24} onClick={() => {
                if (props?.path) {
                    navigate(props.path);
                }
                if (props?.onClick) {
                    props.onClick();
                }
                dispatch(setTabActive(props.navKey))

            }} className={`navbar-item ${props.active ? 'active' : 'unActive'} ${props.popup ? 'popup' : 'nonpopup'}`}>
                <Col lg={6} md={24} className="icon">
                    {props.conversationBadge && props.navKey === 'message' && <div className="badge">{props.conversationBadge}</div>}
                    {props.notifyBadge && props.navKey === 'notify' && <div className="badge">{props.notifyBadge}</div>}
                    {props.icon}
                </Col>
                <Col lg={18} md={0}>
                    {props.label}
                </Col>
                <div className="navbar__item__content">
                    {props?.popup}
                </div>
            </Row>
        </>
    )
}

const navbars = [
    {
        label: 'Trang chủ',
        key: 'home',
        icon: <HomeIcon />,
        path: '/'
    },
    {
        label: 'Tìm kiếm',
        key: 'search',
        icon: <SearchIcon />,
        popup: <Search />,

    },
    {
        label: 'Thông báo',
        key: 'notify',
        icon: <NotifyIcon />,
        popup: <Notifies />,
    },
    {
        label: 'Tin nhắn',
        key: 'message',
        icon: <MessageIcon />,
        popup: <Conversation />
    },
    {
        label: 'Bạn bè',
        key: 'people',
        icon: <ContactIcon />,
        path: '/friend'
    },
    {
        label: 'Cài đặt',
        key: 'setting',
        icon: <SettingIcon />,
        path: '/settings'
    },
]

const NavBar = props => {
    const { tabActive } = useSelector((state) => state.app);
    const { data } = useSelector((state) => state.notify);
    const { user } = useSelector((state) => state.auth);
    const { conversations } = useSelector((state) => state.conversation);

    const unReadNotify = data?.filter((n) => !n.isRead)?.length || 0;
    const unReadConversation = conversations?.filter((n) => n?.read && !(n?.read?.some((u) => u === user._id)))?.length || 0
    const navProps = {
        notifyBadge: unReadNotify > 0 ? unReadNotify : null,
        conversationBadge: unReadConversation > 0 ? unReadConversation : null
    };
    return (
        <>
            <NavBarWrapper>

                {navbars.map((nav) => <NavBarItem popup={nav?.popup} {...navProps} active={tabActive === nav.key} navKey={nav.key} path={nav?.path} key={nav.key} label={nav.label} icon={nav.icon} />)}
            </NavBarWrapper>
        </>

    )
}

NavBar.propTypes = {}

export default NavBar