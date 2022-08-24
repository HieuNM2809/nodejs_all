import { CloseCircleFilled, CloseOutlined, CloseSquareFilled, EyeOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Col, Form, Image, Input, Row, Select } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../../redux/app/action'
import { editPost } from '../../../redux/post/action'
import { FormWrapper } from '../../User/Form/UserForm.style'


const PostForm = props => {
    const [form] = Form.useForm()
    const { dataModal } = useSelector(state => state.app);
    const isDisabled = !!dataModal?.result;
    const dispatch = useDispatch();
    const [resultE, setResultE] = useState(() => {
        if (dataModal?.result) {
            return <>
                <Form.Item label="Kết quả" name="result">
                    <Select disabled  >
                        <Select.Option key={"W"}>
                            Nhắc nhở
                        </Select.Option>
                        {(dataModal?.post || dataModal?.post === null) && <Select.Option key={"D"}>
                            Cảnh cáo,xóa nội dung
                        </Select.Option>}
                        <Select.Option key={"B"}>
                            Khóa tài khoản
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Ghi chú" name="resultNote">
                    <Input.TextArea readOnly rows={3}></Input.TextArea>
                </Form.Item>
            </>
        }
    })



    const handleOnFinish = (values) => {
        delete values.type;
        delete values.name;
        delete values.description;
        if (dataModal?._id) {
            dispatch(editPost({ url: `/${dataModal._id}`, data: values, method: 'patch' }))
        } else {

            dispatch(editPost({ url: ``, data: values, method: 'post' }))
        }

    }
    return (
        <FormWrapper layout="horizontal" initialValues={{ ...dataModal, user: dataModal?.user?.username, }} labelWrap={true} labelCol={{
            flex: '140px'
        }} form={form} onFinish={handleOnFinish}>
            <Row gutter={[12, 12]}>
                <Col xl={12} md={12} sm={24} xs={24}>
                    <Form.Item label="ID" name="_id">
                        <Input readOnly></Input>
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content">
                        <Input.TextArea rows={5} readOnly></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="Video" style={{
                        width: '100%',
                    }}   >

                        <Row gutter={[12, 12]} >
                            {
                                dataModal?.media?.map((v) => {
                                    if (v.url.match('/video/')) {
                                        return <Col span={12}>
                                            <video style={{
                                                width: '100%'
                                            }} controls><source src={v.url} type="video/mp4" /></video>
                                        </Col>
                                    }
                                })
                            }


                        </Row>
                    </Form.Item>


                </Col >
                <Col xl={12} md={12} sm={24} xs={24}>

                    <Form.Item label="Tài khoản đăng" name="user">
                        <Input readOnly={true}></Input>
                    </Form.Item>
                    <Form.Item label="Trạng thái" name="status" >
                        <Select
                            disabled
                        >
                            <Select.Option value={1}>
                                Công khai
                            </Select.Option>
                            <Select.Option value={2}>
                                Riêng tư
                            </Select.Option>

                        </Select>
                    </Form.Item>


                    <Form.Item label="Hình ảnh" >
                        <Row gutter={[12, 12]}>

                            {
                                dataModal?.media?.map(m => {
                                    if (m?.url?.match('/image/'))
                                        return <Col><Image width={100} height={100} style={{
                                            objectFit: 'cover',
                                        }} src={m.url} /></Col>
                                })
                            }
                        </Row>
                    </Form.Item>



                </Col >


            </Row>
            <Row gutter={[12, 12]}  >


            </Row>
            <Row gutter={[12, 12]} justify="end">
                <Col>
                    <Button icon={<EyeOutlined style={{
                        marginRight: '5px'
                    }} />} type="primary" >
                        <a style={{
                            color: 'white'
                        }} href={`${process.env.REACT_APP_CLIENT_SERVER}/posts/${dataModal?._id}`} target="_blank">Đi đến bài viết</a>
                    </Button>
                </Col>
                <Col>
                    <Button icon={<CloseCircleFilled />} type="default" onClick={() => {
                        dispatch(toggleModal(null))
                    }}>
                        Thoát
                    </Button>
                </Col>
            </Row>
        </FormWrapper >
    )
}

PostForm.propTypes = {}

export default PostForm