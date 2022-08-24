import { DeleteOutlined, EditOutlined, EyeOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Layout, message, Popconfirm, Row, Select, Tag } from 'antd'
import moment from 'moment'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../components/DataTable2'
import DatePickerField from '../../components/DatePicker'
import MainModal from '../../components/MainModal'
import { toggleModal } from '../../redux/app/action'
import { deleteReport, getAllReportBasic } from '../../redux/report/action'
import callAPi from '../../utils/apiRequest'
import handleFilter from '../../utils/filter_utils'
import ReportForm from './Form/ReportForm'

const reports = {
    'A': 'Tài khoản',
    'C': 'Nội dung'
}

const reportStatus = {
    'P': <Tag color={"#f50"}>Chờ xử lý</Tag>,
    'I': <Tag color={"#2db7f5"}>Đang xử lý</Tag>,
    'R': <Tag color={"#87d068"}>Đã duyệt</Tag>,
    'N': <Tag color={"rgba(0,0,0,0.5)"}>Không duyệt</Tag>
}

const Report = props => {
    const gridRef = useRef();
    const [form] = Form.useForm()
    const { data, loading, success } = useSelector(state => state.report)
    const [filter, setFilter] = useState({
        page: 1,
        limit: 20,
        filter: [],
    });
    const dispatch = useDispatch()
    const [reportType, setReportType] = useState([]);




    const columnDefs = useMemo(
        () => [

            {
                field: '_id',
                sortable: true,
                resizable: true,
                headerName: 'ID',
                minWidth: 100,


            },
            {
                field: 'reportType',
                sortable: true,
                headerName: 'Loại báo cáo',
                minWidth: 100,
                cellRenderer: (params) => reports[params?.value?.type] || ""

            },
            {
                field: 'reportType',
                sortable: true,
                headerName: 'Chủ đề vi phạm',
                minWidth: 100,
                cellRenderer: (params) => params?.value?.name || ""
            },
            {
                field: 'description',
                sortable: true,
                headerName: 'Thông tin thêm',
                minWidth: 300,
            },
            {
                field: 'user',
                sortable: true,
                headerName: 'Tài khoản vi phạm',
                minWidth: 100,
                cellRenderer: (params) => params?.value?.username || ""
            },
            {
                field: 'createdAt',
                sortable: true,
                headerName: 'Báo cáo lúc',
                minWidth: 200,
                cellRenderer: (params) => moment(params?.value).format('DD-MM-YYYY HH:mm') || ""
            },
            {
                field: 'status',
                headerName: 'Trạng thái',
                minWidth: 100,
                cellRenderer: (params) => reportStatus[params?.value]
            },


            {
                field: 'action',
                headerName: 'Hành động',
                pinned: 'right',
                cellStyle: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                minWidth: 80,
                maxWidth: 80,
                cellRenderer: (params) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            <EditOutlined
                                onClick={() => {
                                    dispatch(toggleModal(params.data));
                                }}
                                style={{
                                    color: '#1890ff',
                                }}
                            />
                            <Popconfirm
                                disabled={params.data.deleted}
                                placement="leftBottom"
                                title={'Bạn có chắc chắn muốn xóa?'}
                                onConfirm={() => {
                                    dispatch(deleteReport({
                                        url: `/${params.data._id}`,
                                        method: 'delete'
                                    }))
                                }}
                                okText="Có"
                                cancelText="Không"
                            >
                                <DeleteOutlined style={{ color: '#FF4D4F' }} />
                            </Popconfirm>
                        </div>
                    );
                },
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    const fetch = async (type) => {
        try {
            const res = await callAPi('admin/reportTypes/getAll', 'post', {
                page: 1,
                limit: 999999999999,
                filter: [{
                    type: 'type',
                    name: type,
                    operator: 'EQUAL'
                }]
            })

            if (res.success) {
                setReportType(res.data.rows);
            }

        } catch (error) {
            message.error(error.message)
        }
    }



    const onFilter = (page) => {
        const values = form.getFieldsValue();

        const newFilter = handleFilter(values);

        setFilter({
            page: typeof page === 'number' ? page : 1,
            limit: 20,
            filter: newFilter
        })

    }

    useEffect(() => {
        if (success) {
            dispatch(getAllReportBasic(filter))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])

    useEffect(() => {
        dispatch(getAllReportBasic(filter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])
    return (
        <Layout className="main-layout">
            <Layout.Content>
                <Row gutter={10} className={"search-layout"}>
                    <Col flex={1}>
                        <Form
                            labelWrap={true}
                            layout="horizontal"
                            labelCol={{
                                flex: '160px'
                            }}
                            labelAlign="left"
                            form={form}
                            onFinish={onFilter}

                        >
                            <Row gutter={[16, 16]}>
                                <Col xl={8} md={24} sm={24} xs={24}>
                                    <Form.Item label="ID" name={"_id"} >
                                        <Input ></Input>
                                    </Form.Item>
                                    <Form.Item label="Loại báo cáo" name="reportType.type" >
                                        < Select allowClear onChange={(v) => {
                                            fetch(v)
                                        }} placeholder="Loại báo cáo" >
                                            <Select.Option value="C">Nội dung</Select.Option>
                                            <Select.Option value="A">Tài khoản</Select.Option>
                                        </Select >
                                    </Form.Item >
                                    <Form.Item label="Trạng thái" name="status" >
                                        <Select allowClear placeholder="Trạng thái" >
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
                                    <DatePickerField />
                                </Col >
                                <Col xl={8} md={24} sm={24} xs={24}>
                                    <Form.Item label="Chủ đề vi phạm" name={"reportType.name"} >
                                        <Select allowClear placeholder="Chủ đề vi phạm">
                                            {
                                                reportType.map((r) => <Select.Option value={r.name}>{r.name}</Select.Option>)
                                            }

                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Tài khoản vi phạm" name={"username"} >
                                        <Input ></Input>
                                    </Form.Item>
                                    <Form.Item name="deleted" label={"Đã xóa"} >
                                        <Select placeholder="Đã xóa " allowClear>
                                            <Select.Option value={false}>Chưa xóa</Select.Option>
                                            <Select.Option value={true}>Đã xóa</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>


                                <Col xl={8} md={24} sm={24} xs={24}

                                >
                                    <Button style={{
                                        float: 'right',
                                    }} icon={<FileSearchOutlined />} htmlType="submit" type="primary">
                                        Tìm kiếm
                                    </Button>
                                </Col>
                            </Row>
                        </Form >
                    </Col >


                </Row >
                <MainModal loading={loading} form={<ReportForm />} />
                {/* <ModalUser filter={filter} /> */}

                <DataTable
                    onPageChange={onFilter}
                    data={data}
                    colDef={columnDefs}
                    paginate={true}
                    ref={gridRef}
                    loading={loading}
                />
            </Layout.Content >
        </Layout >
    )
}
Report.propTypes = {}

export default Report