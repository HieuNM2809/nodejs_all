import { Button, Col, Form, Input, Row, Select } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../../redux/app/action'
import { editPostStyle } from '../../../redux/postStyle/action'
import { FormWrapper } from '../../User/Form/UserForm.style'


const PostStyleForm = props => {
    const [form] = Form.useForm()
    const { dataModal } = useSelector(state => state.app);
    const dispatch = useDispatch();


    const handleOnFinish = (values) => {
        if (dataModal?._id) {
            dispatch(editPostStyle({ url: `/${dataModal._id}`, data: values, method: 'patch' }))
        } else {

            dispatch(editPostStyle({ url: ``, data: values, method: 'post' }))
        }

    }
    return (
        <FormWrapper layout="horizontal" initialValues={{ ...dataModal }} labelWrap={true} labelCol={{
            flex: '140px'
        }} form={form} onFinish={handleOnFinish}>
            <Row gutter={[12, 12]}>
                <Col xl={12} md={12} sm={12} xs={24}>
                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập màu nền bài viết.'
                        }
                    ]} label="Màu Nền" name="background">
                        <input style={{
                            width: '100%',
                            height: '100px',
                        }} type="color"
                        >
                        </input>
                    </Form.Item>

                </Col >
                <Col xl={12} md={12} sm={12} xs={24}>
                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập màu chữ bài viết.'
                        }
                    ]} label="Màu chữ" name="color">
                        <input style={{
                            width: '100%',
                            height: '100px',

                        }} type="color"
                        >
                        </input>
                    </Form.Item>

                </Col>

            </Row>
            <Row gutter={[12, 12]} justify="end">
                <Col>
                    <Button htmlType="submit" type="primary">
                        Lưu
                    </Button>
                </Col>
                <Col>
                    <Button type="default" onClick={() => {
                        dispatch(toggleModal(null))
                    }}>
                        Hủy
                    </Button>
                </Col>
            </Row>
        </FormWrapper>
    )
}

PostStyleForm.propTypes = {}

export default PostStyleForm