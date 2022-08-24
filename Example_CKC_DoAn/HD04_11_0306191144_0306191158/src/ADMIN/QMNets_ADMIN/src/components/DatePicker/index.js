import React from 'react'
import PropTypes from 'prop-types'
import { Form, DatePicker, Row, Col } from 'antd'

const DatePickerField = props => {
    return (
        <Form.Item label={"Thời gian tạo"} name={"createdAt"} >
            <Row wrap={false} gutter={[10]}>
                <Col flex={1}>
                    <Form.Item name={["createdAt", "s"]}>
                        <DatePicker format={"DD-MM-YYYY"} style={{
                            width: '100%'
                        }} placeholder={'Từ ngày'} />
                    </Form.Item>
                </Col>

                <Col flex={1}>
                    <Form.Item name={["createdAt", "e"]}>
                        <DatePicker format={"DD-MM-YYYY"} style={{
                            width: '100%'
                        }} placeholder={'Đến ngày'} />

                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
    )
}

DatePicker.propTypes = {}

export default DatePickerField