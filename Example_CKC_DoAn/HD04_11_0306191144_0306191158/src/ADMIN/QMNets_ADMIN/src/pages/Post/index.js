import { DeleteOutlined, EditOutlined, EyeOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Layout, message, Popconfirm, Row, Select, Tag } from 'antd'
import moment from 'moment'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../components/DataTable2'
import DatePickerField from '../../components/DatePicker'
import MainModal from '../../components/MainModal'
import { toggleModal } from '../../redux/app/action'
import { deletePost, getAllPostBasic } from '../../redux/post/action'
import callAPi from '../../utils/apiRequest'
import handleFilter from '../../utils/filter_utils'
import PostForm from './Form/PostForm'

const status = ['', 'Công khai', 'Riêng tư']

const postStatus = {
    'P': <Tag color={"#f50"}>Chờ xử lý</Tag>,
    'I': <Tag color={"#2db7f5"}>Đang xử lý</Tag>,
    'R': <Tag color={"#87d068"}>Đã xử lý</Tag>
}

const Post = props => {
    const gridRef = useRef();
    const [form] = Form.useForm()
    const { data, loading, success } = useSelector(state => state.post)
    const [filter, setFilter] = useState({
        page: 1,
        limit: 20,
        filter: [],
    });
    const dispatch = useDispatch()
    const [postType, setPostType] = useState([]);




    const columnDefs = useMemo(
        () => [

            {
                field: '_id',
                sortable: true,
                resizable: true,
                headerName: 'ID',
                minWidth: 200,

            },
            {
                field: 'content',
                sortable: true,
                headerName: 'Nội dung',
                minWidth: 200,
                cellRenderer: (params) => params?.value || 'Bài viết hình ảnh, video'
            },
            {
                field: 'likes',
                sortable: true,
                headerName: 'Lượt thích',
                minWidth: 60,
                cellRenderer: (params) => params?.value?.length || 0
            },
            {
                field: 'comments',
                sortable: true,
                headerName: 'Lượt bình luận',
                minWidth: 60,
                cellRenderer: (params) => params?.value?.length || 0
            },
            {
                field: 'user',
                sortable: true,
                headerName: 'Người đăng',
                minWidth: 60,
                cellRenderer: (params) => params?.value?.username || ""
            },
            {
                field: 'status',
                headerName: 'Trạng thái',
                minWidth: 100,
                cellRenderer: (params) => status[params?.value] || ''
            },
            {
                field: 'createdAt',
                sortable: true,
                headerName: 'Đăng lúc',
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
                    justifyContent: "center"
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
                            <EyeOutlined
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
                                    dispatch(deletePost({
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

        const newFilter = handleFilter(values);

        setFilter({
            page: typeof page === 'number' ? page : 1,
            limit: 20,
            filter: newFilter
        })

    }

    useEffect(() => {
        if (success) {
            dispatch(getAllPostBasic(filter))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])

    useEffect(() => {
        dispatch(getAllPostBasic(filter))
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
                                    <Form.Item name="_id" label="ID" >
                                        <Input ></Input>
                                    </Form.Item>
                                    <DatePickerField />
                                </Col>
                                <Col xl={8} md={24} sm={24} xs={24}>
                                    <Form.Item name="username" label="Người đăng" >
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
                        </Form>
                    </Col>

                    {/* <Col>
                        <Button  type="primary" onClick={() => {
                            dispatch(toggleModal("new"))
                        }}>
                            Thêm mới
                        </Button>
                    </Col> */}
                </Row>
                <MainModal loading={loading} form={<PostForm />} />
                {/* <ModalUser filter={filter} /> */}

                <DataTable
                    onPageChange={onFilter}
                    data={data}
                    colDef={columnDefs}
                    paginate={true}
                    ref={gridRef}
                    loading={loading}
                />
            </Layout.Content>
        </Layout >
    )
}
Post.propTypes = {}

export default Post