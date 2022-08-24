import { Col, Input, Row } from 'antd';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AvatarCard from '../../components/Common/AvatarCard';
import Box from '../../components/Common/Box';
import Container from '../../components/Common/Container';
import Loader from '../../components/Common/Loader';
import Post from '../../components/Common/Post';
import Sidebar from '../../components/Layout/MainLayout/Sidebar';
import { md, xl } from '../../constants';
import useScrollInfinity from '../../hooks/useScrollInfinity';
import UseWindow from '../../hooks/useWindowResize';
import { authSelector } from '../../redux/auth/reducer';
import { getPosts, toggleModal } from '../../redux/post/action';
import Contacts from './Contacts';
import { HomeWrapper, MainContentWrapper } from './Home.style';
import Requests from './Requests';



const HomePage = (props) => {
    const [windowSize] = UseWindow()
    const { data, notify, page, isOver, loading } = useSelector(state => state.post);
    const { user } = useSelector(authSelector);
    const dispatch = useDispatch();
    const homeRef = useRef();
    useScrollInfinity(page, getPosts, homeRef, isOver, window);





    return (
        <HomeWrapper>
            {notify && <div onClick={() => {
                window.location.reload();
            }} className="new-post-notify-popup">
                Bài viết mới
            </div>}
            <Container className="container" >
                <Col xl={16} lg={16} md={24} sm={24} xs={24} style={{
                    paddingRight: windowSize.width >= xl ? '5rem' : windowSize.width >= md ? '3rem' : '1rem',
                }}>

                    <MainContentWrapper ref={homeRef}>
                        <Box className="new-post box-shadow" >
                            <Row align="middle">
                                <Col>
                                    <AvatarCard src={user?.avatar?.url} />
                                </Col >
                                <Col onClick={() => {
                                    dispatch(toggleModal())
                                }} className="new-post__content" flex={1}>
                                    <Input size="large" placeholder="Bạn đang nghĩ gì?"></Input>
                                </Col>
                            </Row>
                        </Box>


                        <div className="posts" style={{
                            marginTop: '2rem'
                        }}>
                            {data?.length <= 0 && !loading && <Box style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1.8rem',
                                fontWeight: '600',
                                justifyContent: 'center',
                                height: '100px'
                            }}>
                                Không có bài viết
                            </Box>}
                            {data?.map((post) => <Post key={post?._id} post={post} />)}
                        </div>
                        <Loader loading={loading} />
                    </MainContentWrapper>
                </Col>
                <Col xl={8} lg={8} md={0} sm={0} xs={0}>
                    <Sidebar style={
                        {
                            height: windowSize.height - 100
                        }
                    } className="right-bar">
                        <Requests />
                        <Contacts />
                    </Sidebar>
                </Col>
            </Container>

        </HomeWrapper>
    );
};

HomePage.propTypes = {};

export default HomePage;
