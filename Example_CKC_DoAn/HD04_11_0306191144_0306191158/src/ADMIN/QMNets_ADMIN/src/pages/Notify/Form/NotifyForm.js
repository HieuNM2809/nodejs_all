import { Button, Col, Form, Input, Row, Select } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../../redux/app/action'
import { editNotify } from '../../../redux/notify/action'
import { FormWrapper } from '../../User/Form/UserForm.style'


const notifys = [
    {
        value: 1,
        label: 'Theo dõi người dùng'
    },
    {
        value: 2,
        label: 'Bình luận bài viết'
    },
    {
        value: 3,
        label: 'Thích bình luận bài viết'
    },
    {
        value: 4,
        label: 'Trả lời bình luận'
    },
    {
        value: 5,
        label: 'Thông báo vi phạm'
    },
]
const NotifyForm = props => {
    const [form] = Form.useForm()
    const { dataModal } = useSelector(state => state.app);
    const dispatch = useDispatch();


    const handleOnFinish = (values) => {
        if (dataModal?._id) {
            dispatch(editNotify({ url: `/${dataModal._id}`, data: values, method: 'patch' }))
        } else {

            dispatch(editNotify({ url: ``, data: values, method: 'post' }))
        }

    }

    console.log(dataModal)

    return (
        <FormWrapper layout="horizontal" initialValues={{ ...dataModal }} labelWrap={true} labelCol={{
            flex: '140px'
        }} form={form} onFinish={handleOnFinish}>
            <Row gutter={[12, 12]}>
                <Col xl={12} md={12} sm={24} xs={24}>
                    <Form.Item label="Loại thông báo" name="action">
                        <Select disabled>
                            {notifys.map((n) => (<Select.Option key={n.value} value={n.value}>
                                {n.label}

                            </Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Nội dung" >
                        <Input.TextArea rows={5} readOnly value={dataModal?.user?.username + ' ' + dataModal?.text}>
                        </Input.TextArea>
                    </Form.Item>
                </Col >
                <Col xl={12} md={12} sm={24} xs={24}>
                    <Form.Item label="ID gửi" >
                        <Input readOnly value={dataModal?.user?._id}>

                        </Input>
                    </Form.Item>
                    <Form.Item label="ID nhận" >
                        <Input.TextArea rows={3} readOnly value={dataModal?.recipients?.toString()}>
                        </Input.TextArea>
                    </Form.Item>

                </Col >

            </Row>
            <Row gutter={[12, 12]} justify="end">

                <Col>
                    <Button type="default" onClick={() => {
                        dispatch(toggleModal(null))
                    }}>
                        Thoát
                    </Button>
                </Col>
            </Row>
        </FormWrapper>
    )
}

NotifyForm.propTypes = {}

export default NotifyForm