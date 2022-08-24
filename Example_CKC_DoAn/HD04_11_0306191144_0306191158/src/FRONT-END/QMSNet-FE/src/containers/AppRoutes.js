import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout/AdminLayout';
import DefaultLayout from '../components/Layout/MainLayout/DefaultLayout';
import { refreshToken } from '../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/auth/reducer';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import io from 'socket.io-client';
import { getSocket } from '../redux/socket/action';
import NotifyModal from '../components/Common/NotifyModal';
import Verify from './Auth/Verify';
import ForgotPassword from './Auth/ForgotPassword';
import AppLoading from '../components/Common/AppLoading';


const AppRoutes = () => {
    const { isLogin } = useSelector(authSelector);
    const { appLoading } = useSelector(state => state.app);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(refreshToken())
        const socket = io(`${process.env.REACT_APP_BACKEND_SERVER}`);
        dispatch(getSocket(socket));
        return () => {

            socket.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isLogin && location.pathname === '/signin') {
            navigate('/');
        } else {
            if (location.pathname === '/') {
                navigate('/signin');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])

    return (
        <>
            {appLoading && <AppLoading />}
            <NotifyModal />

            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify/:id" element={<Verify />} />
                <Route path="/forgotPassword/:id" element={<ForgotPassword />} />
                <Route path="*" element={<DefaultLayout />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
