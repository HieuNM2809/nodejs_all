import { EditFilled, MailOutlined, UserAddOutlined, UserDeleteOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Col, Form, message, Modal, Popover, Row, Space } from 'antd'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { MoreIcon } from '../../../assets/icon'
import AvatarCard from '../../../components/Common/AvatarCard'
import BlockBtn from '../../../components/Common/BlockBtn'
import Box from '../../../components/Common/Box'
import FollowModal from '../../../components/Common/FollowModal'
import Layout from '../../../components/Common/Layout'
import Loader from '../../../components/Common/Loader'
import Post from '../../../components/Common/Post'
import ReportModal from '../../../components/Common/ReportModal'
import UploadWithUpdate from '../../../components/Common/UploadWithUpdate'
import { maritalStatus } from '../../../constants'
import useScrollInfinity from '../../../hooks/useScrollInfinity'
import { setTabActive } from '../../../redux/app/action'
import { addConversation, openConversation } from '../../../redux/conversation/action'
import { getPostUserDetail, setUserDetail, userBlock, userFollow } from '../../../redux/user/action'
import Story from './Form/Story'
import { ProfileWrapper } from './Profile.style'

const Profile = props => {
    const { user, status } = useSelector((state) => state.auth);
    const { userDetail, postUserDetail, followLoading, postLoading } = useSelector((state) => state.user);
    const { conversations, totalActive } = useSelector((state) => state.conversation);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [isShowEditDetailModal, setIsShowEditDetailModal] = useState(false);
    const form = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isShowModal, setIsShowModal] = useState(false);
    const isFollowed = useMemo(() => !!userDetail?.followers?.includes(user?._id), [userDetail]);
    const popoverRef = useRef();
    const currentRef = useRef();
    const [followModal, setFollowModal] = useState({
        visible: false,
        userIds: null,
        title: ''
    });
    const postsRef = useRef(false);
    const params = useParams();
    const [isShowReportModal, setIsShowReportModal] = useState(false);


    useEffect(() => {
        currentRef.current = false;
    }, [postUserDetail.pagination.page])

    const handleScroll = useCallback(async () => {
        const isOver = postUserDetail.pagination.count !== 1;
        if (
            window?.innerHeight + window?.pageYOffset >=
            postsRef?.current?.offsetHeight
        ) {
            if (!isOver && !currentRef.current) {
                currentRef.current = true;
                dispatch(getPostUserDetail(userDetail?._id))
            }
            if (isOver) {
                currentRef.current = false;
                message.info('Bạn đã xem hết bài viết')
                window.removeEventListener('scroll', handleScroll);
            }


        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postUserDetail.pagination.page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);





    useEffect(() => {
        dispatch(setTabActive(""))
        if (userDetail && userDetail?._id !== postUserDetail?.user_id) {
            setFollowModal({
                visible: false,
                userIds: null,
                title: ''
            })
            dispatch(getPostUserDetail(userDetail?._id, true));
        }

        if (!userDetail) {
            dispatch(setUserDetail({ _id: params?.slug }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetail])



    const handleShowEditModal = () => {
        setIsShowEditModal(true);
    }
    const handleCloseEditModal = () => {
        setIsShowEditModal(false);
    }
    const handleShowEditDetailModal = (component) => {
        setIsShowEditDetailModal(component);
    }


    useEffect(() => {
        if (status.success && isShowEditDetailModal) {
            setIsShowEditDetailModal(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    const handleFollow = () => {
        const type = isFollowed ? 'unFollow' : 'follow';
        dispatch(userFollow({
            path: type + '/' + userDetail?._id
        }))
    }

    const introductionElement = useMemo(() => <>{userDetail?.works?.map((work, index) => (<Space>
        <img src="/assets/images/work.png" alt="works" />
        <p>{work?.working ? 'Đang làm việc tại ' : 'Đã làm việc tại '}<b>{work.name}</b></p>
    </Space>
    ))}
        {userDetail?.schools?.map((school, index) => (
            <Space>
                <img src="/assets/images/schools.png" alt="schools" />
                <p>{school?.learning ? 'Học tại ' : 'Đã học tại '}<b>{school.name}</b></p>

            </Space>))}
        {userDetail?.address?.province && <Space>
            <img src="/assets/images/home.png" alt="home" />
            <p>Sống tại <b>{userDetail?.address?.district},{userDetail?.address?.province}</b></p>
        </Space>}

        {userDetail?.countryside?.province && <Space>
            <img src="/assets/images/location.png" alt="location" />
            <p>Đến từ <b>{userDetail?.countryside?.district},{userDetail?.countryside?.province}</b></p>
        </Space>}

        {userDetail?.mobile && <Space>
            <img src="/assets/images/phone.png" alt="phone" />
            <div className="bod">{userDetail?.mobile}</div>
        </Space>}
        {userDetail?.email && (!userDetail?.userSettings?.PRIVACY?.email || userDetail?.userSettings?.PRIVACY?.email === 1 || userDetail?._id === user?._id) && <Space>
            <img src="/assets/images/mail.png" alt="mail" />
            <div className="bod">{userDetail?.email}</div>
        </Space>}
        {userDetail?.dob && <Space>
            <img src="/assets/images/dob.png" alt="dob" />
            <div className="bod">Sinh ngày {moment(userDetail?.dob).format('DD/MM/YYYY')}</div>
        </Space>}

        {(!userDetail?.userSettings?.PRIVACY?.followers || userDetail?.userSettings?.PRIVACY?.followers === 1 || userDetail?._id === user?._id) && <Space>
            <img src="/assets/images/followers.png" alt="followers" />
            <div className="followers">Có <b style={{
                cursor: 'pointer'
            }} onClick={() => {
                setFollowModal({
                    userIds: userDetail?.followers,
                    title: 'Người theo dõi',
                    visible: true,
                })
            }}>{userDetail?.followers.length}</b> người theo dõi</div>
        </Space>}
        {(!userDetail?.userSettings?.PRIVACY?.following || userDetail?.userSettings?.PRIVACY?.following === 1 || userDetail?._id === user?._id) && <Space>

            <img src="/assets/images/followers.png" alt="followers" />
            <div className="following">Đang theo dõi <b style={{
                cursor: 'pointer'
            }} onClick={() => {
                setFollowModal({
                    userIds: userDetail?.following,
                    title: 'Đang theo dõi',
                    visible: true,
                })
            }}>{userDetail?.following.length}</b> người</div>
        </Space>}
        {userDetail?.maritalStatus &&
            <Space>
                <img src="/assets/images/maritalStatus.png" alt="maritalStatus" />

                <div className="marital_status">{maritalStatus[userDetail?.maritalStatus]}</div>
            </Space>}

        <Space>
            <img src="/assets/images/joined.png" alt="joined" />
            <div className="join">Tham gia vào {moment(userDetail?.createdAt).format('MM, YYYY')}</div>
        </Space></>, [userDetail])


    return (
        <>
            <ReportModal visible={isShowReportModal} setVisible={setIsShowReportModal} type="A" />
            {<FollowModal visible={followModal.visible} setVisible={setFollowModal} title={followModal.title} userIds={followModal.userIds} />}
            <Modal width={800} maskStyle={{
                color: 'black'
            }} destroyOnClose={true} footer={null} title={'Chỉnh sửa'} className="edit-detail-profile-modal" visible={!!isShowEditDetailModal} onCancel={() => setIsShowEditDetailModal(false)}>
                {isShowEditDetailModal}
            </Modal>

            <Modal destroyOnClose={true} footer={null} width={700} visible={isShowEditModal} onCancel={handleCloseEditModal} className="edit-profile-modal" title="Chỉnh sửa thông tin cá nhân">

                <UploadWithUpdate />


                <Row justify="space-between">
                    <Col className="edit-title">
                        Tiểu sử
                    </Col>
                    <Col>
                        <Button onClick={() => handleShowEditDetailModal(<Story form={form} />)} type="link">Chỉnh sửa</Button>
                    </Col>
                </Row>
                <Row className='edit-preview' justify="center" style={{
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                }}>
                    {userDetail?.story}
                </Row>
                <Row justify="space-between">
                    <Col className="edit-title">
                        Giới thiệu
                    </Col>
                    <Col>
                        <Button onClick={() => navigate('/settings')} type="link">Chỉnh sửa</Button>
                    </Col>
                </Row>
                <div className='edit-preview' >
                    {introductionElement}
                </div>

            </Modal>
            <Layout >

                <ProfileWrapper ref={postsRef}>
                    <Box style={
                        {
                            marginBottom: '10px'
                        }
                    }>

                        <Row gutter={[12, 12]} className="header-profile" justify="space-between" align="middle">
                            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                <AvatarCard style={{
                                    alignItems: "center"
                                }} src={userDetail?.avatar.url} className={'avatar'} content={<>
                                    <div className="username">{userDetail?.username}<i style={{
                                        backgroundImage: "url('/assets/images/blue-check.png')",
                                        backgroundSize: '20px',
                                        marginLeft: '5px',
                                        width: '20px',
                                        height: '20px',
                                        display: userDetail?.isAdmin ? "inline-block" : "none"
                                    }}></i></div>
                                    <div className="fullname">{userDetail?.fullname}</div>
                                </>} />
                            </Col>
                            <Col xl={12} lg={24} md={24} sm={24} xs={24} className='header-profile__right' >
                                <Row gutter={24} align="stretch" justify="end">
                                    <Col>
                                        {user?._id !== userDetail?._id && <Button size="large" loading={followLoading} icon={isFollowed ? <UserDeleteOutlined /> : <UserAddOutlined />} onClick={handleFollow} className="q-button" type="primary">{isFollowed ? 'Bỏ theo dõi' : 'Theo dõi'}</Button>}
                                        {user?._id === userDetail?._id && <Button size="large" className="q-button q-button-outline" icon={<EditFilled />} onClick={handleShowEditModal}>Chỉnh sửa thông tin cá nhân</Button>}
                                    </Col>
                                    {isFollowed && user?._id !== userDetail?._id &&
                                        <Col>
                                            <Button onClick={() => {
                                                const isExist = conversations.find((cv) => cv.participants[0]._id === userDetail._id || cv.participants[1]._id === userDetail._id);
                                                if (isExist) {
                                                    dispatch(openConversation(isExist._id));
                                                } else {
                                                    dispatch(addConversation({
                                                        participants: [user, userDetail],
                                                        fakeId: userDetail._id,
                                                        messages: [],
                                                        isOpen: totalActive + 1,
                                                    }))
                                                }
                                            }} className='q-button q-button-outline' >
                                                <MailOutlined />
                                                Nhắn tin
                                            </Button>
                                        </Col>
                                    }
                                    {user?._id !== userDetail?._id && <Col style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <input style={{
                                            width: '0',
                                            height: '0',
                                            border: 'unset'
                                        }} ref={popoverRef} onBlur={() => {
                                            setIsShowModal(false)
                                        }} type="text" id="more-actions" />
                                        <label htmlFor="more-actions" >

                                            <Popover visible={isShowModal} overlayClassName='postActions' placement="bottom" content={<>
                                                <div className="postActions" >
                                                    <BlockBtn user={userDetail} onMouseDown={() => {


                                                        dispatch(userBlock({ path: `block/${userDetail?._id}` }))

                                                        setTimeout(() => navigate('/settings', { state: 'block' }), 1)


                                                    }} />
                                                    <Row onMouseDown={(e) => {
                                                        setIsShowReportModal({ post: null, user: userDetail?._id })
                                                    }}>
                                                        <Col>
                                                            <WarningOutlined />
                                                        </Col>
                                                        <Col>
                                                            Báo cáo người dùng
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </>} trigger="click">
                                                <MoreIcon onClick={() => {
                                                    popoverRef.current.focus();
                                                    setIsShowModal(true)
                                                }} style={{
                                                    cursor: 'pointer'
                                                }} />
                                            </Popover>
                                        </label>
                                    </Col>}
                                </Row>
                            </Col>
                        </Row>
                    </Box>
                    <Row gutter={[32, 32]}>

                        <Col xl={8} lg={8} md={24} sm={24} xs={24} className="about">
                            <Box>
                                <div className="story">
                                    <div className="section-title">Tiểu sử</div>

                                    <p style={{
                                        whiteSpace: "pre-line"
                                    }}>
                                        {userDetail?.story}
                                    </p>

                                </div>
                                <div className="stats">
                                    <div className="section-title" >Giới thiệu</div>
                                    {introductionElement}
                                </div>
                            </Box>
                        </Col>
                        <Col xl={16} lg={16} md={24} sm={24} xs={24}>

                            {postUserDetail?.posts?.length > 0 ? postUserDetail?.posts?.map((post) => <Post post={post} isPostDetail={true} />) : <Box style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1.8rem',
                                fontWeight: '600',
                                justifyContent: 'center',
                                height: '100px'
                            }}>
                                Không có bài viết
                            </Box>}
                            <Loader loading={postLoading} />
                        </Col>
                    </Row>
                </ProfileWrapper>
            </Layout>
        </>
    )
}

Profile.propTypes = {}

export default Profile