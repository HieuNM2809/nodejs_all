import React from 'react';
import styled from 'styled-components';

const SupportWrapper = styled.div`
padding: 1rem;
.tab-title{
    font-size:18px;
    font-weight:500;
    margin-bottom: 1rem;
    
}
.title{
    font-size: 16px;
    font-weight: 500;
    line-height: 2;
    span{
        font-weight: 400;
    }
}
span.no-data{
    font-size:16px;
    font-weight:500;
    text-align: center;
    display: block;
    margin: 2rem 0;
}
`;

const Support = () => {



    return (
        <SupportWrapper>
            <div className="tab-title">
                Liên hệ và Hỗ trợ
            </div>
            <div className="item">
                <div className="title">Email hỗ trợ: <span>support@qmnets.social</span> </div>
                <div className="title">Email báo cáo: <span>admin@qmnets.social</span> </div>
                <div className="title">Số điện thoại: <span>0334940499</span> </div>
                <div className="title">Địa chỉ 1: <span>65 Đ. Huỳnh Thúc Kháng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</span> </div>
                <div className="title">Địa chỉ 2: <span>T. Tân Điệp 1, IaAke,Phú Thiện, Gia Lai, Việt Nam</span> </div>
                <div className="title">Địa chỉ 3: <span>Phủ Diễn Châu 2, Nghệ An, Việt Nam</span> </div>
            </div>
        </SupportWrapper>
    )
}

export default Support