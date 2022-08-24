import { LoginOutlined, SearchOutlined, ToolOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Dropdown, Form, Input, Menu, message, Modal, Radio, Row, Select } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axiosClient from '../../../../api/axiosClient'
import { CreateIcon, ProfileIcon, SaveIcon } from '../../../../assets/icon'
import { setTabActive } from '../../../../redux/app/action'
import { logout } from '../../../../redux/auth/action'
import { authSelector } from '../../../../redux/auth/reducer'
import { addPost, editPost, toggleModal } from '../../../../redux/post/action'
import { PostSelector } from '../../../../redux/post/reducer'
import { setUserDetailSuccess } from '../../../../redux/user/action'
import AvatarCard from '../../../Common/AvatarCard'
import ChooseEmoji from '../../../Common/ChooseEmoji'
import InfinityLoading from '../../../Common/InfinityLoading'
import UploadAttachment from '../../../Common/UploadAttachment'
import { HeaderWrapper } from './Header.style'


const bgs = [{
  background: '#ffffff',
  color: 'black',
},
{
  background: 'red',
  color: 'white',
},
{
  background: 'orange',
  color: 'white',
},
{
  background: 'yellow',
  color: 'red',
},
]

const Header = props => {
  const textInputRef = useRef();
  const { user } = useSelector(authSelector);
  const { showModal } = useSelector(PostSelector);
  const textAreaInputRef = useRef();
  const [options, setOptions] = useState([]);
  const [currentBG, setCurrentBG] = useState(showModal?.styles || {
    background: '#ffffff',
    color: '#000000',
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const defaultBG = options?.find((bg) => bg?.background === '#ffffff')

  const handleModal = () => {
    dispatch(toggleModal())
  }

  useEffect(() => {
    setCurrentBG(showModal?.styles || defaultBG);

  }, [showModal])

  useEffect(() => {
    form.setFieldsValue({
      content: showModal?.content
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal])
  const onImageChange = (files) => {
    form.setFieldsValue({
      media: files
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleSubmit = () => {
    const formData = form.getFieldsValue();
    formData.media = form.getFieldValue('media');
    formData.content = textAreaInputRef.current.value || showModal?.content;
    formData.status = formData?.status || 1;
    formData.styles = currentBG;
    if (formData?.styles?.background !== "#ffffff" && formData?.media) {
      delete formData?.media
    }
    if (!formData?.content) {
      return message.error('Vui lòng nhập nội dung bài viết')
    }
    if (!showModal?._id) {
      dispatch(addPost(formData))
    } else {
      formData['_id'] = showModal?._id;
      dispatch(editPost(formData, true))
    }

  }

  const menu = (
    <Menu
      items={[
        {
          icon: <ProfileIcon />,
          label: <Link to="" onClick={(e) => {
            e.preventDefault()
            dispatch(setUserDetailSuccess({ ...user }));
          }}>Trang cá nhân</Link>,
          key: '0',
        },
        {
          icon: <SaveIcon />,
          label: <Link to="/saved">Đã lưu</Link>,
          key: '1',
        },

        {
          type: 'divider',
        },
        {
          icon: <LoginOutlined width={'20px'} height={'20px'} style={{
            width: '2rem',
            height: '2rem',
          }} />,
          label: <Link to="" onClick={(e) => {
            e.preventDefault()
            dispatch(logout())
          }} type="text">Đăng xuất</Link>,
          key: '3',
        },
      ]}
    />
  );

  const fetchApi = async () => {
    try {
      const res = await axiosClient.post(`/admin/postStyles/getAll`, {
        filter: [
          {
            type: 'type',
            name: props?.type,
            operator: 'LIKE'

          },
          {
            type: 'deleted',
            name: false,
            operator: 'EQUAL'

          },

        ]
      });
      if (res.success) {
        setOptions(res.data.rows);
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <>
      <HeaderWrapper>

        <Modal maskClosable={false} afterClose={() => {
          form.resetFields()
        }} destroyOnClose={true} wrapClassName="new-post-modal" title={showModal?._id ? "Chỉnh sửa bài viết" : "Tạo bài viết"} onOk={handleModal} onCancel={handleModal} visible={showModal} width={600} footer={<Button size="large" className="q-button" onClick={handleSubmit} type="primary">Đăng</Button>}>
          <Form form={form}>

            <AvatarCard src={user?.avatar?.url} content={<>
              <div className="username">
                {user.username}
              </div>
              <Form.Item style={{
                maxWidth: 'max-content',
                margin: '0'
              }} name="status" initialValue={showModal?.status || user?.userSettings?.PRIVACY?.post || 1}>
                <Select className="scope" size="small" >
                  <Select.Option value={1}>Công khai</Select.Option>
                  <Select.Option value={2}>Riêng tư</Select.Option>
                </Select>
              </Form.Item>
            </>}>

              <div className="post__content">
                <Form.Item name="content">
                  {currentBG?.background !== '#ffffff' ? <>
                    <textarea ref={textAreaInputRef} onKeyDown={(e) => {
                      var key = e.keyCode || e.charCode;
                      if (textInputRef.current.offsetHeight > 200) {
                        if ((key === 8 || key === 46)) {
                          textInputRef.current.innerText = e.target.value;
                        } else {
                          e.target.value = String(textInputRef.current.innerText).substring(0, String(textInputRef.current.innerText).length - 1);
                        }
                      }

                    }} onChange={(e) => {
                      if (textInputRef.current.offsetHeight <= 200) {
                        textInputRef.current.innerText = e.target?.value;
                      }
                    }} id="post-content" className="hide-input"></textarea>

                    <label style={currentBG} htmlFor="post-content">
                      <p ref={textInputRef}>
                        {form.getFieldValue('content') || 'Bạn đang nghĩ gì thế?'}
                      </p>

                    </label>
                  </> : <textarea style={{
                    resize: 'unset'
                  }} ref={textAreaInputRef} className="content" rows={6} placeholder='Bạn đang nghĩ gì thế?'></textarea>}
                </Form.Item>
              </div>
              {currentBG?.background === '#ffffff' &&
                <UploadAttachment data={showModal?.media} onImageChange={onImageChange} maxCount={4} />}
              <Row justify="space-between">

                <Col>
                  <Radio.Group defaultValue={currentBG} onChange={(e) => {
                    form.setFieldsValue({
                      styles: e.target.value,
                      media: null
                    })
                    setCurrentBG(e.target.value);

                  }} >
                    {options.map((bg) => <Radio.Button key={bg?._id} value={bg}><div style={{
                      width: "30px",
                      height: "100%",
                      background: bg.background,
                    }}></div> </Radio.Button>)}

                  </Radio.Group>
                </Col>
                <Col className="emoji-choose">
                  <ChooseEmoji content={textInputRef?.current?.value} setContent={(value) => {
                    if (textAreaInputRef.current) {
                      if (currentBG.background === '#ffffff') {
                        textAreaInputRef.current.value += value;
                      }
                      if (textInputRef?.current?.offsetHeight <= 200) {
                        textInputRef.current.innerText += value;
                        textAreaInputRef.current.value += value;
                      }

                    }
                  }} />
                </Col>
              </Row>
            </AvatarCard>
          </Form>
        </Modal>
        <Row gutter={36} wrap={false} justify="space-between" align="middle" className="header__content" >
          <Col className="header__content__logo">
            <Link to="/">
              <img src="/assets/images/logo.png" alt="" />
            </Link>

          </Col>
          <Col className="header__content__func">
            <Row gutter={10} wrap={false}>
              <Col md={14} sm={0} xs={0} className="header__content__func__search">
                <Input onClick={() => dispatch(setTabActive('search'))} size="large" prefix={<SearchOutlined />} placeholder="Tìm kiếm" ></Input>
              </Col>

              <Col className="header__content__func__create-post">
                <Button className="q-button" onClick={handleModal} size="large" type="primary" >
                  <CreateIcon />
                  Tạo bài viết
                </Button>

              </Col >
              <Col className="header__content__func__profile">
                <Dropdown overlayClassName='header-dropdown' overlay={menu} trigger={['click']}>
                  <Avatar size="large" onClick={(e) => {
                    e.preventDefault();
                  }} style={{
                    cursor: 'pointer'
                  }} src={user?.avatar?.url} />
                </Dropdown>

              </Col>

            </Row>
          </Col>


        </Row>
      </HeaderWrapper>
      <InfinityLoading />
    </>
  )
}

Header.propTypes = {}

export default Header