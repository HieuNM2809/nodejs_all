import { Button, Col, Form, Input, Row, Select } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../../redux/app/action'
import { editReportType } from '../../../redux/reportType/action'
import { FormWrapper } from '../../User/Form/UserForm.style'


const ReportTypeForm = props => {
    const [form] = Form.useForm()
    const { dataModal } = useSelector(state => state.app);
    const dispatch = useDispatch();


    const handleOnFinish = (values) => {
        if (dataModal?._id) {
            dispatch(editReportType({ url: `/${dataModal._id}`, data: values, method: 'patch' }))
        } else {

            dispatch(editReportType({ url: ``, data: values, method: 'post' }))
        }

    }
    return (
        <FormWrapper layout="horizontal" initialValues={{ ...dataModal }} labelWrap={true} labelCol={{
            flex: '140px'
        }} form={form} onFinish={handleOnFinish}>
            <Row gutter={[12, 12]}>
                <Col xl={24} md={24} sm={24} xs={24}>
                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập loại báo cáo'
                        }
                    ]} label="Loại báo cáo" name="type">
                        <Select>
                            <Select.Option key={"C"}>
                                Nội dung
                            </Select.Option>
                            <Select.Option key={"A"}>
                                Tài khoản
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Chủ đề vi phạm'
                        }
                    ]} label="Chủ đề vi phạm" name="name">
                        <Input></Input>
                    </Form.Item>
                </Col >

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

ReportTypeForm.propTypes = {}

export default ReportTypeForm