import { SaveOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { changePassword } from '../../../../redux/auth/action';

const ServiceForm = styled(Form)`

padding-right: 2rem;
padding-top: 2rem;
padding-left: 2rem;
.ant-form-item-required::before{
    display: none !important;
  }
  label{
    font-size: 1.6rem;
    font-weight: 500;
  }
`;

const Service = () => {
    const [form] = Form.useForm();
    const { loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    return (
        <ServiceForm labelCol={{ flex: '200px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }} colon={false} onFinish={(values) => {
                dispatch(changePassword(values))
            }} form={form}>
            <Form.Item
                name="oldPassword"
                label="Mật khẩu cũ"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu cũ!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password size="large" />
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu mới"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password size="large" />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng xác nhận mật khẩu mới!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu không khớp, vui lòng kiểm tra lại!'));
                        },
                    }),
                ]}
            >
                <Input.Password size="large" />
            </Form.Item>
            <Form.Item>
                <Button loading={loading} className="q-button" type="primary" icon={<SaveOutlined />} size="large" style={{
                    marginTop: '10px',
                    width: '100%',
                }} htmlType="submit">
                    Lưu
                </Button>
            </Form.Item>

        </ServiceForm>
    )
}

export default Service