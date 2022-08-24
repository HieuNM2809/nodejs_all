import { Col, Modal } from 'antd';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Friend from '../../../containers/Friend';
import HomePage from '../../../containers/Home';
import { HomeWrapper, MainContentWrapper } from '../../../containers/Home/Home.style';
import PostPage from '../../../containers/Post';
import PostModal from '../../../containers/Post/PostModal';
import Saved from '../../../containers/Post/Saved';
import Settings from '../../../containers/Settings';
import Profile from '../../../containers/User/Profile';
import { setReportModal, setTabActive } from '../../../redux/app/action';
import { authSelector } from '../../../redux/auth/reducer';
import { getPosts, setDetailModal, setPostDetail } from '../../../redux/post/action';
import { getUserRequests, getUserSuggestions } from '../../../redux/user/action';
import AppLoading from '../../Common/AppLoading';
import Box from '../../Common/Box';
import Container from '../../Common/Container';
import ConversationPopup from '../../Common/ConversationPopup';
import MyReportModal from '../../Common/MyReportModal';
import Post from '../../Common/Post';
import PrivateRoute from '../PrivateRoute';
import { LayoutWrapper } from './DefaultLayout.style';
import Header from './Header';
import NavBar from './NavBar';
import Siderbar from './Sidebar';

const LayoutRoutes = () => {
    const location = useLocation();
    const { tabActive } = useSelector((state) => state.app);
    const { isLogin, isLogout } = useSelector(authSelector);
    const { userDetail } = useSelector((state) => state.user);
    const navigate = useNavigate();


    const dispatch = useDispatch();

    useEffect(() => {
        if (tabActive !== 'home' && location.pathname === "/") {
            dispatch(setTabActive('home'))
        }
        if (location.pathname === "/friend") {
            dispatch(setTabActive('people'))
        }
        if (location.pathname === "/settings") {
            dispatch(setTabActive('setting'))
        }
        if (location.pathname === '/saved') {

            dispatch(setTabActive(''))
        }
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        if (userDetail) {
            navigate(`/${userDetail.username}`)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetail])

    useEffect(() => {
        if (isLogin) {
            dispatch(getPosts());
            dispatch(getUserSuggestions())
            dispatch(getUserRequests())
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])
    useEffect(() => {
        if (isLogout) {
            navigate(`/signin`)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogout])


    return (
        <Routes>
            <Route path="/" element={
                <HomePage />
            } />
            <Route path="/friend" element={
                <Friend />
            } />
            <Route path="/settings" element={
                <Settings />
            } />
            <Route path="/saved" element={
                <Saved />
            } />
            <Route path="/posts/:slug" element={
                <PostPage />
            } />
            <Route path="/:slug" element={
                <Profile />
            } />
        </Routes>
    )
}

const DefaultLayout = (props) => {
    const { user } = useSelector(authSelector);
    const { postDetail, detailModal } = useSelector(state => state.post);
    const { reportModal, appLoading } = useSelector(state => state.app);
    const dispatch = useDispatch();

    return <LayoutWrapper>



        <Modal onCancel={() => {
            dispatch(setReportModal(null));
        }} centered={true} destroyOnClose={true} width={800} visible={reportModal} footer={null} title={"Thông báo vi phạm"}>
            <MyReportModal id={reportModal} />
        </Modal>

        <Modal afterClose={() => {
            dispatch(setPostDetail(null));
        }} width={`${postDetail?.styles?.background === '#fff' && postDetail?.media?.length === 0 ? '50%' : '90%'}`} bodyStyle={{
            padding: '0 10px'
        }} centered={true} closable={false} onCancel={() => { dispatch(setDetailModal(null)) }} destroyOnClose={true} className='post-modal' visible={detailModal?.id} footer={null} title={null}>
            <PostModal id={detailModal?.id} params={detailModal?.params} />
        </Modal>
        <HomeWrapper>
            {user && <Header />}
            <Container className="container">
                <Col xl={5} lg={5} md={3} sm={4} xs={4}>
                    {user && <Siderbar className="left-bar">
                        <Box className="box-shadow" style={{
                            paddingTop: '0',
                            paddingBottom: '0',
                        }}>
                            <NavBar />

                        </Box>
                    </Siderbar>}
                </Col>
                <Col xl={19} lg={19} md={21} sm={20} xs={20} >
                    <MainContentWrapper>

                        <LayoutRoutes />
                        {user &&
                            <ConversationPopup />}
                    </MainContentWrapper>
                </Col>

            </Container>

        </HomeWrapper>


    </LayoutWrapper>
};

DefaultLayout.propTypes = {};

export default DefaultLayout;
