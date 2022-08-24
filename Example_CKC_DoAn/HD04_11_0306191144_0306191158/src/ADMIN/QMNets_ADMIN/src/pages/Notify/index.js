import { DeleteOutlined, EditOutlined, EyeOutlined, FileSearchOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Layout, Popconfirm, Row, Select } from 'antd'
import moment from 'moment'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../components/DataTable2'
import DatePickerField from '../../components/DatePicker'
import MainModal from '../../components/MainModal'
import { toggleModal } from '../../redux/app/action'
import { deleteNotify, getAllNotifyBasic } from '../../redux/notify/action'
import handleFilter from '../../utils/filter_utils'
import NotifyForm from './Form/NotifyForm'

const notifys = {
    1: 'Theo dõi người dùng',
    2: 'Thích bài viết',
    3: 'Bình luận bài viết',
    4: 'Thích bình luận bài viết',
    5: 'Trả lời bình luận',
    6: 'Thông báo vi phạm',
}

const Notify = props => {
    const gridRef = useRef();
    const [form] = Form.useForm()
    const { data, loading, success } = useSelector(state => state.notify)
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
                field: 'text',
                sortable: true,
                headerName: 'Nội dung',
                minWidth: 400,

                cellRenderer: (params) => params?.data?.user ? (params?.data?.user?.username + ' ' + params.value) : params.value

            },
            {
                field: 'recipients',
                sortable: true,
                headerName: 'ID Nhận',
                minWidth: 100,
                valueFormatter: (params) => params?.value?.toString(',') || '',
                cellRenderer: (params) => params?.value?.toString() || ''

            },
            {
                field: 'user',
                sortable: true,
                headerName: 'ID gửi',
                minWidth: 100,
                cellRenderer: (params) => params?.data?.action === 6 ? 'Hệ thống' : params?.value?._id

            },

            {
                field: 'action',
                sortable: true,
                headerName: 'Loại thông báo',
                minWidth: 100,
                cellRenderer: (params) => notifys[params?.value] || ""

            },
            {
                field: 'createdAt',
                sortable: true,
                headerName: 'Ngày tạo',
                minWidth: 100,
                cellRenderer: (params) => moment(params?.value).format('DD-MM-YYYY HH:mm') || ""

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
                            <EyeOutlined
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
                                    dispatch(deleteNotify({
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

        const newFilter = handleFilter(values, 'EQUAL')

        setFilter({
            page: typeof page === 'number' ? page : 1,
            limit: 20,
            filter: newFilter
        })

    }

    useEffect(() => {
        if (success) {
            dispatch(getAllNotifyBasic(filter))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])

    useEffect(() => {
        dispatch(getAllNotifyBasic(filter))
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
                                    <Form.Item label="ID gửi" name={"user"} >
                                        <Input ></Input>
                                    </Form.Item>

                                    <DatePickerField />


                                </Col>
                                <Col xl={8} md={24} sm={24} xs={24}>
                                    <Form.Item label="ID nhận" name={"user"} >
                                        <Input ></Input>
                                    </Form.Item>
                                    <Form.Item name="action" label={"Loại thông báo"} >
                                        <Select placeholder="Loại thông báo " allowClear>
                                            {Object.keys(notifys).map((n) => <Select.Option value={n}>{notifys[n]}</Select.Option>)}
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

                                </Col>
                            </Row >
                        </Form >
                    </Col >

                </Row >
                <MainModal loading={loading} form={<NotifyForm />} />
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
Notify.propTypes = {}

export default Notify