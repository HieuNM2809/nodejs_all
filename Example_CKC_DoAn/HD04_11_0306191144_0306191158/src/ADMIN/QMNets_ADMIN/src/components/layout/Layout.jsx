import React, { useEffect } from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/app/action'
import SignIn from '../../pages/Auth/SignIn'
import { refreshToken } from '../../redux/auth/action'

const Layout = () => {

    const app = useSelector(state => state.app)
    const { isLogin } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
        dispatch(refreshToken())
    }, [dispatch])



    return (
        <BrowserRouter>
            <Route render={(props) => isLogin ? (
                <div className={`layout ${app.mode} ${app.color}`}>
                    <Sidebar {...props} />
                    <div className="layout__content">
                        <TopNav />
                        <div className="layout__content-main">
                            <Routes />
                        </div>
                    </div>
                </div>
            ) : <div className={`layout ${app.mode} ${app.color}`}>

                <Switch>
                    <Route path='/' component={SignIn} />
                </Switch>
            </div>} />
        </BrowserRouter>
    )
}

export default Layout
