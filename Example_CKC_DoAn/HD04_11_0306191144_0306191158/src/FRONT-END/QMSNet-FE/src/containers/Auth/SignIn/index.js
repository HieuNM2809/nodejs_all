import { Button, Divider, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { AuthWrapper } from '../Auth.style'
import { MailOutlined, LockOutlined, FacebookOutlined } from '@ant-design/icons'
import Box from '../../../components/Common/Box'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, loginStart } from '../../../redux/auth/action'
import { setAppLoading } from '../../../redux/app/action'

const SignIn = () => {
  const [form] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  const handleOnFinishForm = (values) => {
    dispatch(setAppLoading(true))
    dispatch(loginStart(values))
  }



  return (
    <>
      <Modal destroyOnClose={true} centered footer={null} onCancel={() => setForgotPasswordModal(false)} visible={forgotPasswordModal} title="Quên mật khẩu">
        <Form onFinish={(values) => {

          dispatch(forgotPassword(values))
          setForgotPasswordModal(false)
        }} form={forgotForm}>
          <Form.Item
            name="email"
            rules={[{ type: "email", required: true, message: 'Vui lòng nhập Email!' }]}
          >
            <Input size="large" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />

          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                style={{
                  width: '100%'
                }}
                className="q-button"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={
                  !forgotForm.isFieldsTouched(true) ||
                  !!forgotForm.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Quên mật khẩu
              </Button>
            )}
          </Form.Item>
        </Form>

      </Modal>
      <AuthWrapper>
        <div className="pseudo"></div>
        <video autoPlay muted loop id="myVideo">
          <source src="/assets/video/video-bg.mp4" type="video/mp4" />
        </video>
        <Box width="400px" className="">
          <img className="main__box__logo" src="/assets/images/logo.png" alt="" />
          <div style={{
            marginBottom: '2rem'
          }} className="title">
            Tham gia với chúng tôi ngay nào.
          </div>

          <Form form={form} onFinish={handleOnFinishForm} name="horizontal_login" layout="horizontal" >
            <Form.Item
              name="email"
              rules={[{ type: "email", required: true, message: 'Vui lòng nhập Email!' }]}
            >
              <Input size="large" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />

            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  loading={loading}
                  className="q-button"
                  size="large"
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  Đăng nhập
                </Button>
              )}
            </Form.Item>
            {/* <Divider>Hoặc</Divider> */}
            {/* <div className="social__button">
            <FacebookOutlined /> Đăng nhập bằng Facebook
          </div> */}
            <div className="forgot__button">
              <Link onClick={(e) => {
                e.preventDefault();
                setForgotPasswordModal(true)
              }} style={{
                fontSize: '1.5rem'
              }} to={''}>
                Quên mật khẩu
              </Link>
            </div>
          </Form>
        </Box>

        <Box width="400px" style={{
          marginTop: '2rem',
          padding: '3rem'
        }}>
          <div className="navigate">
            Bạn chưa có tài khoản ư? <Link to={'/signup'}>Đăng ký</Link>
          </div>
        </Box>
      </AuthWrapper>
    </>
  )
}

export default SignIn