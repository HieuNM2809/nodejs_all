import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ReportModalWrapper } from './ReportModal.style'
import { Button, Form, Input, message, Modal, Select } from 'antd'
import axiosClient from '../../../api/axiosClient'


const ReportModal = props => {
    const [options, setOptions] = useState([])
    const [form] = Form.useForm()
    const [typeSelect, setTypeSelect] = useState({})
    const title = props?.type === 'A' ? 'Báo cáo tài khoản' : 'Báo cáo nội dung';

    const fetchApi = async () => {
        try {
            const res = await axiosClient.post(`/admin/reportTypes/getAll`, {
                page: 1,
                limit: 100000,
                filter: [
                    {
                        type: 'type',
                        name: props?.type,
                        operator: 'LIKE'

                    },
                    {
                        type: 'deleted',
                        name: false,
                        operator: 'EQUAL'

                    },

                ]
            });
            if (res.success) {
                setOptions(res.data.rows);
            }
        } catch (error) {
        }
    }

    const handleReport = async (values) => {
        try {
            const data = { ...values, ...props?.visible, reportType: typeSelect }
            const res = await axiosClient.post(`/admin/reports/create`, data);
            if (res.success) {
                props.setVisible(null);
                message.success(res.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        if (props.visible) {

            fetchApi()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.visible])

    return (
        <Modal destroyOnClose={true} visible={props.visible} title={title} footer={null} onCancel={() => {
            props.setVisible(null)
        }} wrapClassName='report-modal'>
            <ReportModalWrapper >

                <Form form={form} onFinish={handleReport}>

                    <Form.Item name="reportType" >
                        <Select size="large" options={options} fieldNames={{
                            label: 'name',
                            value: '_id'
                        }} onSelect={(value, option) => {

                            setTypeSelect(option);

                        }} placeholder="Chọn loại vi phạm">


                        </Select>
                    </Form.Item>

                    <Form.Item size="large" name="description" >
                        <Input.TextArea placeholder="Thông tin thêm"
                            rows={10}></Input.TextArea>
                    </Form.Item>

                    <Button size="large" htmlType="submit" type="primary" style={{
                        width: '100%'
                    }} className='q-button'>
                        Báo cáo
                    </Button>
                </Form>
            </ReportModalWrapper>
        </Modal>
    )
}

ReportModal.propTypes = {}

export default ReportModal