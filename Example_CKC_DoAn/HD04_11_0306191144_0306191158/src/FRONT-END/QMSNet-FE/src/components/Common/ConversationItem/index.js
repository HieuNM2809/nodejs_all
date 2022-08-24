import { CloseOutlined, DeleteOutlined, LoadingOutlined, MoreOutlined, SendOutlined, StopOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Col, Form, Input, message, Popover, Row } from 'antd'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ImageIcon, LikeIcon } from '../../../assets/icon'
import { authSelector } from '../../../redux/auth/reducer'
import { addMessage, deleteConversation, getMessage, toggleConversation } from '../../../redux/conversation/action'
import { setUserDetail, userBlock } from '../../../redux/user/action'
import { checkImage } from '../../../utils/image_utils'
import BlockBtn from '../BlockBtn'
import ChooseEmoji from '../ChooseEmoji'
import ConfirmModal from '../ConfirmModal'
import Message from '../Message'
import { ConversationItemWrapper } from './ConversationItem.style'

const ConversationItem = props => {
    const inputRef = useRef();
    const fileRef = useRef();
    const navigate = useNavigate();
    const { user } = useSelector(authSelector);
    const [isPopoverShow, setIsPopoverShow] = useState(false)
    const { data } = useSelector(state => state.online);
    const [sendIconShow, setSendIconShow] = useState(false);
    const recipient = props?.data?.participants?.find((p) => p._id !== user._id);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [mediaLoading, setMediaLoading] = useState(false);
    const [deleteConversationConfirm, setDeleteConversationConfirm] = useState(false);
    const isOnline = data?.find((cv) => cv._id === props?.data?._id);
    useEffect(() => {
        if (props?.data?._id && !props?.data?.pagination) {

            dispatch(getMessage(props?.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.data?._id])

    const handleChosseEmoji = (value) => {
        setSendIconShow(true);
        form.setFieldsValue({
            text: (form.getFieldValue('text') || "") + value
        })
    }

    const handleSendMessage = (values) => {
        form.resetFields();

        setSendIconShow(false);
        dispatch(addMessage({
            recipient,
            fakeId: props?.data?.fakeId || "", _id: props?.data?._id || '', ...values
        }));
    }


    const handleOnFileChange = async (e) => {
        const file = e.target.files[0];

        const error = checkImage(file);

        if (error) {
            return message.error(error)
        }

        setMediaLoading(true);


        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
        formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);


        const res = await axios.post(
            process.env.REACT_APP_CLOUDINARY_API,
            formData,
        );
        if (res?.status === 200) {
            form.setFieldsValue({
                fakeId: ""
            })
            handleSendMessage({
                ...form.getFieldsValue(),
                text: "",
                media: {
                    url: res.data.url,
                    public_id: res.data.public_id
                }
            })
            setMediaLoading(false);

        } else {
            setMediaLoading(false);

        }

    }

    const handleOnScrollTop = (e) => {
        if (!props?.data?.isOver) {

            if (Math.ceil(e.target.offsetHeight + (-e.target.scrollTop)) >= e.target.scrollHeight) {
                dispatch(getMessage(props?.data));
            }
        }
    }


    return (
        <>
            <ConfirmModal visible={deleteConversationConfirm} setVisible={setDeleteConversationConfirm} title="Xóa cuộc trò chuyện" subTitle="Bạn không thể hoàn tác sau khi xóa bản sao của cuộc trò chuyện này." okText="Xóa" onMouseDown={() => {
                dispatch(deleteConversation(props.data._id))
                setIsPopoverShow(false)
            }} />
            <Form form={form} onFinish={handleSendMessage}>
                <Form.Item name="sender" hidden initialValue={user._id}>
                    <Input></Input>
                </Form.Item>
                <Form.Item hidden name="media">
                    <input onChange={handleOnFileChange} ref={fileRef} type="file" />
                </Form.Item>
                <ConversationItemWrapper>
                    <div className="header">
                        <div className="header-left">
                            <div className="avatar">
                                <Badge offset={[-8, 28]} status="success" dot={isOnline}>
                                    <Avatar src={recipient?.avatar?.url} />
                                </Badge>
                            </div>
                            <div className="information">
                                <div className="username">{recipient.username} <i style={{
                                    backgroundImage: "url('/assets/images/blue-check.png')",
                                    backgroundSize: '15px',
                                    width: '15px',
                                    height: '15px',
                                    display: recipient?.isAdmin ? "inline-block" : "none"
                                }}></i></div>
                                {isOnline && <div className="activity-status">
                                    Đang hoạt động
                                </div>}

                            </div>
                        </div>
                        <div className="header-right">
                            <Popover onBlur={() => {
                                setIsPopoverShow(false)

                            }} visible={isPopoverShow} overlayClassName='postActions' placement="bottom" content={<>
                                <div className="postActions" >
                                    <Row onMouseDown={(e) => {
                                        dispatch(setUserDetail(recipient))
                                        setIsPopoverShow(false)
                                    }}>
                                        <Col>
                                            <UserOutlined />
                                        </Col>
                                        <Col>
                                            Xem trang cá nhân
                                        </Col>
                                    </Row>

                                    <Row onMouseDown={(e) => {
                                        setDeleteConversationConfirm(true)
                                    }}>
                                        <Col>
                                            <DeleteOutlined />
                                        </Col>
                                        <Col>
                                            Xóa cuộc trò chuyện
                                        </Col>
                                    </Row>

                                    <BlockBtn user={recipient} onMouseDown={async () => {

                                        dispatch(userBlock({ path: `block/${recipient?._id}` }))
                                        setTimeout(() => navigate('/settings', { state: 'block' }), 1)

                                    }} />
                                </div>
                            </>} trigger="click">
                                <MoreOutlined onClick={() => setIsPopoverShow(true)} style={{
                                    transform: 'rotate(90deg)',
                                }} />
                            </Popover>

                            <CloseOutlined onClick={() => {
                                dispatch(toggleConversation(props?.data?._id || props?.data?.fakeId))
                            }} />
                        </div>

                    </div>
                    <div className="body" onScroll={handleOnScrollTop} >
                        {props?.data?.messages?.map((m, index) => <Message key={m?._id || index} data={m} nextMess={props?.data?.messages[index - 1] || null} prevMess={props?.data?.messages[index + 1] || null} recipient={recipient} type={m?.sender === user._id ? 'me' : 'friend'} />)}
                    </div>
                    {!user?.following?.includes(recipient?._id || props?.data?.fakeId) || user?.blocks?.includes(recipient?._id || props?.data?.fakeId) || recipient?.blocks?.includes(user?._id) || recipient?.deleted || (recipient?.status && recipient?.status !== 'A') ? <div className="footer" style={{
                        textAlign: "center",
                        justifyContent: "center"
                    }}>
                        Bạn không thể trả lời cuộc trò chuyện này
                    </div> : <div className="footer">
                        <ImageIcon onClick={() => fileRef.current.click()} />
                        <Form.Item name="text" noStyle>
                            <Input autoFocus={true} ref={inputRef} onKeyDown={(e) => {
                                if (e.keyCode === 13) {

                                    form.submit()
                                }

                            }} onChange={(e) => {
                                if (!sendIconShow && e.target.value) {
                                    setSendIconShow(true)
                                }
                                if (sendIconShow && !e.target.value) {
                                    setSendIconShow(false)
                                }
                            }} noStyle suffix={<ChooseEmoji setContent={handleChosseEmoji} id={`emoji-message-${Math.random()}`} />}></Input>
                        </Form.Item>
                        {mediaLoading ? <LoadingOutlined className='media-loading' /> : sendIconShow ? <SendOutlined onClick={() => {
                            form.submit()
                        }} className="send-icon" /> : <LikeIcon onClick={() => {

                            handleSendMessage({
                                ...form.getFieldsValue(),
                                text: "",
                                icon: true
                            })
                        }} />}

                    </div>}
                </ConversationItemWrapper>
            </Form >
        </>
    )
}

ConversationItem.propTypes = {}

export default ConversationItem