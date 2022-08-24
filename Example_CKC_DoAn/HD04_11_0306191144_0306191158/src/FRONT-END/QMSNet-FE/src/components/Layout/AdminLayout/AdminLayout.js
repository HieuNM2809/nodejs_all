import React from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import DashBoard from '../../../containers/AdminPage/Dashboard'


const AdminRouters = () => {
  return <Routes>
    <Route path="/" element={
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    } />

  </Routes>
}

const AdminLayout = props => {
  return (
    <AdminRouters />
  )
}

AdminLayout.propTypes = {}

export default AdminLayout