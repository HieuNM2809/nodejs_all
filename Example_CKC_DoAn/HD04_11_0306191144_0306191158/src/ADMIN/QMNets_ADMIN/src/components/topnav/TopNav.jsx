import React from 'react'

import './topnav.css'


import Dropdown from '../dropdown/Dropdown'

import ThemeMenu from '../thememenu/ThemeMenu'


import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth/action'





const Topnav = () => {
    const { user } = useSelector(state => state.auth)

    const renderUserToggle = (user) => (
        <div className="topnav__right-user">
            <div className="topnav__right-user__image">
                <img src={user.avatar.url} alt="" />
            </div>
            <div className="topnav__right-user__name">
                {user.username}
            </div>
        </div>
    )
    const dispatch = useDispatch()

    const renderUserMenu = (item, index) => (
        <a href={item.path} onClick={(e) => {
            if (!item.path) {
                dispatch(logout())
            }
        }} target="_blank" key={index}>
            <div className="notification-item">
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </a>
    )

    const user_menu = [
        {
            icon: "bx bx-user",
            content: "Trang cá nhân",
            path: process.env.REACT_APP_CLIENT_SERVER + '/' + user.username

        },
        {
            icon: "bx bx-log-out-circle bx-rotate-180",
            content: "Đăng xuất",
            path: null
        }
    ]
    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Tìm kiếm ở đây...' />
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu />
                </div>
            </div>
        </div>
    )
}

export default Topnav
