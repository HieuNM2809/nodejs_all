import React, { useEffect } from 'react'

import { Route, Switch, useHistory } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import User from '../pages/User'
import ReportType from '../pages/ReportType'
import Report from '../pages/Report'
import Post from '../pages/Post'
import Comment from '../pages/Comment'
import PostStyle from '../pages/PostStyle'
import Notify from '../pages/Notify'

const Routes = () => {

    return (
        <Switch>
            <Route path='/' exact component={User} />
            <Route path='/Users' exact component={User} />
            <Route path='/ReportTypes' exact component={ReportType} />
            <Route path='/Reports' exact component={Report} />
            <Route path='/Posts' exact component={Post} />
            <Route path='/Comments' exact component={Comment} />
            <Route path='/PostStyles' exact component={PostStyle} />
            <Route path='/Notifies' exact component={Notify} />
            <Route path='/customers' component={Customers} />
        </Switch>
    )
}

export default Routes
