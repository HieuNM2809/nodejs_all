import { CloseCircleFilled, CloseOutlined, CloseSquareFilled, EyeOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../../redux/app/action'
import { editReport } from '../../../redux/report/action'
import { FormWrapper } from '../../User/Form/UserForm.style'


const ReportForm = props => {
    const [form] = Form.useForm()
    const { dataModal } = useSelector(state => state.app);
    const { loading } = useSelector(state => state.report);
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
            dispatch(editReport({ url: `/${dataModal._id}`, data: values, method: 'patch' }))
        } else {

            dispatch(editReport({ url: ``, data: values, method: 'post' }))
        }

    }
    return (
        <FormWrapper layout="horizontal" initialValues={{ ...dataModal, ...dataModal?.reportType, }} labelWrap={true} labelCol={{
            flex: '140px'
        }} form={form} onFinish={handleOnFinish}>
            <Row gutter={[12, 12]}>
                <Col xl={12} md={12} sm={24} xs={24}>
                    <Form.Item label="Loại báo cáo" name="type">
                        <Select disabled>
                            <Select.Option key={"C"}>
                                Nội dung
                            </Select.Option>
                            <Select.Option key={"A"}>
                                Tài khoản
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Thông tin thêm" name="description">
                        <Input.TextArea rows={5} readOnly></Input.TextArea>
                    </Form.Item>

                </Col >
                <Col xl={12} md={12} sm={24} xs={24}>

                    <Form.Item label="Chủ đề vi phạm" name="name">
                        <Input readOnly={true}></Input>
                    </Form.Item>
                    <Form.Item label="Trạng thái" name="status" >
                        <Select disabled={isDisabled} onChange={(v) => {
                            if (v === 'R') {
                                setResultE(<>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn kết quả'
                                        }
                                    ]} label="Kết quả" name="result">
                                        <Select placeholder="Kết quả">
                                            <Select.Option key={"W"}>
                                                Nhắc nhở
                                            </Select.Option>
                                            {dataModal?.post && <Select.Option key={"D"}>
                                                Cảnh cáo, xóa nội dung
                                            </Select.Option>}
                                            <Select.Option key={"B"}>
                                                Khóa tài khoản
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item rules={[
                                        {
                                            required: true,
                                            message: 'Vui thêm ghi chú'
                                        }
                                    ]} label="Ghi chú" name="resultNote">
                                        <Input.TextArea rows={3}></Input.TextArea>
                                    </Form.Item>
                                </>)
                            } else {
                                setResultE(null)
                            }
                        }}>
                            <Select.Option key={"P"}>
                                Đang chờ duyệt
                            </Select.Option>
                            <Select.Option key={"I"}>
                                Đang duyệt
                            </Select.Option>
                            <Select.Option key={"R"}>
                                Đã duyệt
                            </Select.Option>
                            <Select.Option key={"N"}>
                                Không duyệt
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    {resultE}


                </Col >


            </Row>
            <Row gutter={[12, 12]} justify="end">
                {!isDisabled && <Col>
                    <Button icon={<EyeOutlined />} type="primary" >
                        {dataModal?.reportType?.type === 'C' ? <a style={{
                            color: 'white'
                        }} href={`${process.env.REACT_APP_CLIENT_SERVER}/posts/${dataModal?.post?._id}`} target="_blank">Xem nội dung vi phạm</a> : <a style={{
                            color: 'white'
                        }} href={`${process.env.REACT_APP_CLIENT_SERVER}/${dataModal?.user?.username}`} target="_blank">Xem tài khoản vi phạm</a>}
                    </Button>
                </Col>}
                <Col>
                    <Button loading={loading} disabled={isDisabled} icon={<SaveOutlined />} htmlType="submit" type="primary">
                        Lưu
                    </Button>
                </Col>
                <Col>
                    <Button icon={<CloseCircleFilled />} type="default" onClick={() => {
                        dispatch(toggleModal(null))
                    }}>
                        Hủy
                    </Button>
                </Col>
            </Row>
        </FormWrapper >
    )
}

ReportForm.propTypes = {}

export default ReportForm