import { DeleteOutlined, EditOutlined, FileSearchOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Layout, Popconfirm, Row, Select } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../components/DataTable2'
import MainModal from '../../components/MainModal'
import { toggleModal } from '../../redux/app/action'
import { deleteReportType, getAllReportTypeBasic } from '../../redux/reportType/action'
import handleFilter from '../../utils/filter_utils'
import ReportTypeForm from './Form/ReportTypeForm'

const reportTypes = {
    'A': 'Tài khoản',
    'C': 'Nội dung'
}

const ReportType = props => {
    const gridRef = useRef();
    const [form] = Form.useForm()
    const { data, loading, success } = useSelector(state => state.reportType)
    const [filter, setFilter] = useState({
        page: 1,
        limit: 20,
        filter: [],
    });
    const dispatch = useDispatch()





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
                field: 'type',
                sortable: true,
                headerName: 'Loại báo cáo',
                minWidth: 200,
                cellRenderer: (params) => reportTypes[params?.value] || ""

            },
            {
                field: 'name',
                sortable: true,
                headerName: 'Chủ đề vi phạm',
                minWidth: 200,
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
                                placement="leftBottom"
                                disabled={params.data.deleted}
                                title={'Bạn có chắc chắn muốn xóa?'}
                                onConfirm={() => {
                                    dispatch(deleteReportType({
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


    const onFilter = (page) => {
        const values = form.getFieldsValue();

        const newFilter = handleFilter(values)

        setFilter({
            page: typeof page === 'number' ? page : 1,
            limit: 20,
            filter: newFilter
        })

    }

    useEffect(() => {
        if (success) {
            dispatch(getAllReportTypeBasic(filter))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])

    useEffect(() => {
        dispatch(getAllReportTypeBasic(filter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])
    return (
        <Layout className='main-layout'>
            <Layout.Content>
                <Row gutter={10} className={"search-layout"}>
                    <Col flex={1}>
                        <Form
                            labelWrap={true}
                            layout="horizontal"
                            labelCol={{
                                flex: '140px'
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

                                    <Form.Item label="Loại báo cáo" name="type" >
                                        < Select allowClear placeholder="Loại báo cáo" >
                                            <Select.Option value="C">Nội dung</Select.Option>
                                            <Select.Option value="A">Tài khoản</Select.Option>
                                        </Select >
                                    </Form.Item >

                                </Col>
                                <Col xl={8} md={24} sm={24} xs={24}>
                                    <Form.Item label="Chủ đề vi phạm" name={"name"} >
                                        <Input placeholder={'Chủ đề vi phạm'} />
                                    </Form.Item>
                                    <Form.Item name="deleted" label={"Đã xóa"} >
                                        <Select placeholder="Đã xóa " allowClear>
                                            <Select.Option value={false}>Chưa xóa</Select.Option>
                                            <Select.Option value={true}>Đã xóa</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col
                                    xl={8} md={24} sm={24} xs={24}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: '5px',
                                    }}
                                >
                                    <Button icon={<FileSearchOutlined />} htmlType="submit" type="primary">
                                        Tìm kiếm
                                    </Button>
                                    <Button icon={<PlusSquareOutlined />} type="primary" onClick={() => {
                                        dispatch(toggleModal("new"))
                                    }}>
                                        Thêm mới
                                    </Button>
                                </Col>
                            </Row >
                        </Form >
                    </Col >

                </Row >
                <MainModal loading={loading} form={<ReportTypeForm />} />
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
ReportType.propTypes = {}

export default ReportType