import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/auth/reducer';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const auth = useSelector(authSelector);

      return auth?.user ? children : <Navigate to="/signin" />;
}

PrivateRoute.propTypes = {}

export default PrivateRoute