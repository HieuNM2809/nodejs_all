import { CloseCircleFilled, CloseOutlined, CloseSquareFilled, EyeOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Col, Form, Image, Input, Row, Select } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../../redux/app/action'
import { editComment } from '../../../redux/comment/action'
import { FormWrapper } from '../../User/Form/UserForm.style'


const CommentForm = props => {
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
                        {(dataModal?.comment || dataModal?.comment === null) && <Select.Option key={"D"}>
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
            dispatch(editComment({ url: `/${dataModal._id}`, data: values, method: 'patch' }))
        } else {

            dispatch(editComment({ url: ``, data: values, method: 'comment' }))
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

                </Col >
                <Col xl={12} md={12} sm={24} xs={24}>

                    <Form.Item label="Tài khoản đăng" name="user">
                        <Input readOnly={true}></Input>
                    </Form.Item>
                    <Form.Item label="ID Bài viết" name="postId" >
                        <Input readOnly={true}></Input>
                    </Form.Item>

                    {resultE}


                </Col >


            </Row>

            <Row gutter={[12, 12]} justify="end">

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

CommentForm.propTypes = {}

export default CommentForm