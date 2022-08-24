import React, { useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import './sidebar.css'

import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import { useSelector } from 'react-redux'

const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {

    const app = useSelector(state => state.app)
    const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)



    return (
        <div className='sidebar'>
            <div className="sidebar__logo">
                <img style={{
                    width: '150px',
                    objectFit: 'contain'
                }} src={`${process.env.REACT_APP_CLIENT_SERVER}/assets/images/${app?.mode === 'theme-mode-dark' ? 'logo-dark.png' : 'logo.png'}`} alt="company logo" />
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar
