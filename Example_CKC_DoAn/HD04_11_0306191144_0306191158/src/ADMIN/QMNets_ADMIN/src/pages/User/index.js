import { Button, Col, DatePicker, Form, Image, Input, Layout, Popconfirm, Row, Select } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import DataTable from '../../components/DataTable2'
import { deleteUser, getAllUserBasic } from '../../redux/user/action'
import { statusElement } from '../../utils/element_utils'
import { DeleteOutlined, EditOutlined, FileSearchOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import MainModal from '../../components/MainModal'
import { toggleModal } from '../../redux/app/action'
import UserForm from './Form/UserForm'
import handleFilter from '../../utils/filter_utils'
import DatePickerField from '../../components/DatePicker'

const User = props => {
    const gridRef = useRef();
    const [form] = Form.useForm()
    const { data, loading, success } = useSelector(state => state.user)
    const [filter, setFilter] = useState({
        page: 1,
        limit: 20,
        filter: [],
    });
    const [filterType, setFilterType] = useState('username');
    const dispatch = useDispatch()


    const columnDefs = useMemo(
        () => [
            {
                field: 'avatar',
                headerName: 'Ảnh',
                cellRenderer: (params) => {
                    return <Image src={params?.value?.url} width={40} height={40} style={{ objectFit: 'cover', border: '1px solid rgba(0,0,0,0.1)' }} />;
                },
                minWidth: 80,
                maxWidth: 80,
            },
            {
                field: 'username',
                sortable: true,
                headerName: 'Tên đăng nhập',
                filter: true,
                suppressMenu: true,
                floatingFilter: true,
                minWidth: 150,
            },
            {
                field: 'fullname',
                sortable: true,
                filter: true,
                headerName: 'Họ và tên',
                suppressMenu: true,
                floatingFilter: true,
                minWidth: 150,
            },
            {
                field: 'email',
                sortable: true,
                filter: true,
                headerName: 'Email',
                suppressMenu: true,
                floatingFilter: true,
                minWidth: 150,
            },
            {
                field: 'mobile',
                sortable: true,
                filter: true,
                headerName: 'Số điện thoại',
                suppressMenu: true,
                floatingFilter: true,
                minWidth: 150,
            },
            {
                field: 'dob',
                sortable: true,
                headerName: 'Ngày sinh',
                minWidth: 100,
                valueFormatter: (params) => {
                    if (params?.value) {

                        return moment(params?.value).format('DD-MM-YYYY')
                    } else {
                        return '';
                    }
                }
            },
            {
                field: 'createdAt',
                sortable: true,
                headerName: 'Ngày tham gia',
                minWidth: 100,
                valueFormatter: (params) => {
                    if (params?.value) {

                        return moment(params?.value).format('DD-MM-YYYY')
                    } else {
                        return '';
                    }
                }
            },

            {
                field: 'status',
                floatingFilter: true,
                headerName: 'Trạng thái',
                suppressMenu: true,
                minWidth: 100,
                maxWidth: 150,
                cellRenderer: (params) => {
                    return statusElement(params?.value)
                },
            },

            {
                field: 'action',
                pinned: 'right',
                headerName: 'Hành động',
                cellStyle: {
                    display: 'flex',
                    alignItems: 'center',
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
                                justifyContent: 'center',
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
                                    dispatch(deleteUser({
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
            dispatch(getAllUserBasic(filter))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])



    useEffect(() => {
        dispatch(getAllUserBasic(filter))
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
                                    <Form.Item initialValue={filterType} label="Loại từ khóa">
                                        <Select onChange={(value) => {
                                            setFilterType(value);
                                        }} defaultValue={filterType} >
                                            <Select.Option value="username">Tên tài khoản</Select.Option>
                                            < Select.Option value="fullname" > Họ và tên</Select.Option >
                                            <Select.Option value="email">Email</Select.Option>
                                            <Select.Option value="mobile">Số điện thoại</Select.Option>
                                        </Select >
                                    </Form.Item >
                                    <Form.Item label="Từ khóa" name={filterType} normalize={(val) => val?.trimStart()}>
                                        <Input placeholder={'Tìm kiếm'} />
                                    </Form.Item>
                                    <DatePickerField />


                                </Col>
                                <Col xl={8} md={24} sm={24} xs={24}>
                                    <Form.Item name="status" label={"Trạng thái tài khoản"} >
                                        <Select placeholder="Trạng thái tài khoản" allowClear>
                                            <Select.Option value={'I'}>Chưa kích hoạt</Select.Option>
                                            <Select.Option value={'A'}>Đã kích hoạt</Select.Option>
                                            <Select.Option value={'B'}>Đã Khóa</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="isAdmin" label={"Quyền"} >
                                        <Select placeholder="Quyền" allowClear>
                                            <Select.Option value={false}>Thành viên thường</Select.Option>
                                            <Select.Option value={true}>Quản trị viên</Select.Option>
                                        </Select>
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
                            </Row>
                        </Form >
                    </Col >


                </Row >
                <MainModal loading={loading} form={<UserForm />} />
                {/* <ModalUser filter={filter} /> */}

                <DataTable
                    data={data}
                    onPageChange={onFilter}
                    colDef={columnDefs}
                    ref={gridRef}
                    loading={loading}
                />
            </Layout.Content >
        </Layout >
    )
}
User.propTypes = {}

export default User