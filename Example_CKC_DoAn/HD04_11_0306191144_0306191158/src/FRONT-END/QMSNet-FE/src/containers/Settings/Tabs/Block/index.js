import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import ConfirmModal from '../../../../components/Common/ConfirmModal';
import { GET } from '../../../../constants';
import { userBlock } from '../../../../redux/user/action';
import callAPi from '../../../../utils/apiRequest';
import BlockItem from './BlockItem';

const BlockWrapper = styled.div`
padding: 1rem;
.tab-title{
    font-size:18px;
    font-weight:500;
    margin-bottom: 1rem;
    
}
span.no-data{
    font-size:16px;
    font-weight:500;
    text-align: center;
    display: block;
    margin: 2rem 0;
}
`;

const Block = () => {
    const [blocks, setBlocks] = useState([]);
    const [searchs, setSearchs] = useState([]);
    const { user } = useSelector(state => state.auth);
    const inputRef = useRef()
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(null);
    const location = useLocation();
    const fetchApi = async () => {
        const res = await callAPi('users/block', GET);
        if (res && res?.success) {
            setBlocks(res.data)
        }
    }

    useEffect(() => {
        if (blocks.length === 0) {
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])



    const handleFilterChange = (e) => {
        if (blocks.length > 0) {


            const search = inputRef?.current?.input?.value
                .toLowerCase()
                .replace(/ /g, '');
            if (!search) {
                setSearchs([]);
            } else {


                const res = blocks.filter((user) => user.username.includes(search));
                setSearchs(res);

            }
        }
    };
    const handleOnUnblock = (id) => {
        setModalShow(id)
    }
    return (
        <>
            <ConfirmModal onMouseDown={() => {
                dispatch(userBlock({ path: `unblock/${modalShow}` }))

            }} okText="Hủy chặn" visible={modalShow} setVisible={setModalShow} title="Bạn có muốn hủy chặn?" subTitle="Bạn và người dùng này có thể liên lạc và nhìn thấy bài viết của nhau trong tương lai." />
            <BlockWrapper>
                <div className="tab-title">
                    Danh sách đã chặn
                </div>
                <Input.Search ref={inputRef} onSearch={handleFilterChange} onChangeCapture={handleFilterChange} size="large" placeholder="Tìm kiếm"></Input.Search>
                <div className="blocks">
                    {blocks.length <= 0 && <span className="no-data">Bạn chưa chặn người dùng nào</span>}
                    {(searchs.length > 0 || inputRef?.current?.input?.value) ? searchs.map((user) => <BlockItem onUnBlock={handleOnUnblock} user={user} />) : blocks.map((user) => <BlockItem onUnBlock={handleOnUnblock} user={user} />)}

                </div>
            </BlockWrapper>
        </>
    )
}

export default Block