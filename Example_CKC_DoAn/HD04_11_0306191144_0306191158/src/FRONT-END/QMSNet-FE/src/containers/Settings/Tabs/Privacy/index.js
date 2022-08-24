import { SaveOutlined } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { setUserSettings } from '../../../../redux/user/action';

const PrivacyWrapper = styled.div`
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

const Privacy = () => {
    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.auth);

    const onFinish = (values) => {
        dispatch(setUserSettings({
            PRIVACY: values
        }))
    }


    return (
        <PrivacyWrapper>
            <Form onFinish={onFinish} labelCol={{ flex: '300px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }} colon={false}>
                <Form.Item initialValue={user?.userSettings?.PRIVACY?.email || 1} name="email" label="Ai có thể thấy email của bạn?">
                    <Select size="large" >
                        <Select.Option value={1}>Công khai</Select.Option>
                        <Select.Option value={2}>Riêng tư</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item initialValue={user?.userSettings?.PRIVACY?.followers || 1} name="followers" label="Ai có thể thấy người theo dõi bạn?">
                    <Select size="large" >
                        <Select.Option value={1}>Công khai</Select.Option>
                        <Select.Option value={2}>Riêng tư</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item initialValue={user?.userSettings?.PRIVACY?.following || 1} name="following" label="Ai có thể thấy người bạn theo dõi?">
                    <Select size="large" >
                        <Select.Option value={1}>Công khai</Select.Option>
                        <Select.Option value={2}>Riêng tư</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item initialValue={user?.userSettings?.PRIVACY?.post || 1} name="post" label="Ai là người sẽ thấy các bài viết của bạn trong tương lai?">
                    <Select size="large" >
                        <Select.Option value={1}>Công khai</Select.Option>
                        <Select.Option value={2}>Riêng tư</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} className="q-button" type="primary" icon={<SaveOutlined />} size="large" style={{
                        marginTop: '10px',
                        width: '100%',
                    }} htmlType="submit">
                        Lưu
                    </Button>
                </Form.Item>
            </Form>

        </PrivacyWrapper>
    )
}

export default Privacy