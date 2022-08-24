import { DeleteOutlined, EditOutlined, EyeOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Layout, message, Popconfirm, Row, Select, Tag } from 'antd'
import moment from 'moment'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../../components/DataTable2'
import DatePickerField from '../../components/DatePicker'
import MainModal from '../../components/MainModal'
import { toggleModal } from '../../redux/app/action'
import { deleteComment, getAllCommentBasic } from '../../redux/comment/action'
import callAPi from '../../utils/apiRequest'
import handleFilter from '../../utils/filter_utils'
import CommentForm from './Form/CommentForm'


const Comment = props => {
    const gridRef = useRef();
    const [form] = Form.useForm()
    const { data, loading, success } = useSelector(state => state.comment)
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
                field: 'user',
                sortable: true,
                headerName: 'Người bình luận',
                minWidth: 60,
                cellRenderer: (params) => params?.value?.username || ""
            },
            {
                field: 'postId',
                sortable: true,
                headerName: 'ID Bài viết',
                minWidth: 60,
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
                    justifyContent: 'center',
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
                                    dispatch(deleteComment({
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
            dispatch(getAllCommentBasic(filter))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success])

    useEffect(() => {
        dispatch(getAllCommentBasic(filter))
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
                                    <Form.Item name="postId" label="Id Bài viết" >
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
                <MainModal loading={loading} form={<CommentForm />} />
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
Comment.propTypes = {}

export default Comment