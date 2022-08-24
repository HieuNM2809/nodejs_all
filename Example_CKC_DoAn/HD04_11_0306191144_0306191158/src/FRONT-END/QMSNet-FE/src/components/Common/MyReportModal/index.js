import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Carousel from '../Carousel';
import { Button } from 'antd';
import axiosClient from '../../../api/axiosClient';
import Loader from '../Loader';
import Box from '../Box';
import AvatarCard from '../AvatarCard';
import PostHeading from '../PostHeading';
import { useSelector } from 'react-redux';

const MyReportModalWrapper = styled.div`
.title{
    text-align: center;
    margin:  1rem 0;
    font-size: 16px;
}`;

const reports = {
    'A': 'Tài khoản',
    'C': 'Nội dung'
}
const phat = {
    'W': 'Nhắc nhở',
    'D': 'Cảnh cáo, Xóa Nội dung',
    'B': 'Khóa tài khoản'
}
const MyReportModal = props => {
    const [report, setReport] = useState(null);
    const { user } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);

    const fetchApi = async () => {
        setLoading(true)
        try {
            const res = await axiosClient.get(`admin/reports/${props?.id}`);
            if (res.success) {
                setLoading(false)
                setReport(res.data);
            }
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.id])


    return (
        <MyReportModalWrapper>
            <Loader loading={loading} />
            {!loading && <><div className="type">
                Loại vi phạm: <b>{reports[report?.reportType?.type]}</b>
            </div>
                <div className="type">
                    Chủ đề vi phạm: <b>{report?.reportType?.name}</b>
                </div>
                <div className="type">
                    Hình phạt: <b>{phat[report?.result]}</b>
                </div>
                <div className="type">
                    Ghi chú: <b>{report?.resultNote}</b>
                </div>
                <div style={{
                    color: 'red'
                }}>
                    Lưu ý: Vi phạm nội dung trên hệ thống quá 3 lần tài khoản của bạn sẽ bị khóa.
                </div>
                {report?.reportType?.type === 'C' && <div className="project">
                    <div className="title">
                        <b>Nội dung vi phạm</b>
                    </div>
                    <Box className={'post__container'}>
                        <AvatarCard style={{
                            alignItems: 'center'
                        }} src={user.avatar?.url} content={
                            <PostHeading post={report?.post} hiddenAction={true} />
                        }>

                            <div style={{
                                fontSize: '20px',
                                borderTop: 'thin solid rgba(0,0,0,0.1)',
                                background: report?.post?.styles?.background,
                                color: report?.post?.styles?.color,
                            }} className={`text-content ${report?.post?.styles?.background !== "#ffffff" && 'with-style'}`} >
                                {report?.post?.content}
                            </div>
                            <Carousel media={report?.post?.media} />

                        </AvatarCard>
                    </Box>
                </div>}
            </>}
        </MyReportModalWrapper >
    )
}

MyReportModal.propTypes = {}

export default MyReportModal