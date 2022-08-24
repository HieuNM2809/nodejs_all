import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Box from '../../../components/Box'
import { loginStart } from '../../../redux/auth/action'
import { AuthWrapper } from '../Auth.style'

const SignIn = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnFinishForm = (values) => {
    dispatch(loginStart(values))
  }



  return (
    <>

      <AuthWrapper>
        <div className="pseudo"></div>
        <video autoPlay muted loop id="myVideo">
          <source src={`${process.env.REACT_APP_CLIENT_SERVER}/assets/video/video-bg.mp4`} type="video/mp4" />
        </video>
        <Box width="400px" className="">
          <img className="main__box__logo" src={`${process.env.REACT_APP_CLIENT_SERVER}/assets/images/logo.png`} alt="" />
          <div style={{
            marginBottom: '2rem'
          }} className="title">
            Quản trị QMNets
          </div>

          <Form form={form} onFinish={handleOnFinishForm} name="horizontal_login" layout="horizontal" >
            <Form.Item
              name="email"
              rules={[{ type: "email", required: true, message: 'Vui lòng nhập Email!' }]}
            >
              <Input prefix={<i class='bx bx-envelope' ></i>} placeholder="Email" />

            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password

                prefix={<i class='bx bx-lock-alt' ></i>}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button size="larger"
                  loading={loading}

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

          </Form>
        </Box>


      </AuthWrapper>
    </>
  )
}

export default SignIn