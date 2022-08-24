import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { Form, Input, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { SearchWrapper } from './Search.style'
import SearchHistory from '../SearchHistory';
import callAPi from '../../../../../utils/apiRequest';
import { GET } from '../../../../../constants';
import SearchItem from '../SearchItem';
import { useSelector } from 'react-redux';
import { setUserDetail, setUserSettings } from '../../../../../redux/user/action';
import { useDispatch } from 'react-redux';
import { setTabActive } from '../../../../../redux/app/action';

const Search = () => {
    const [searchs, setSearchs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const typingTimeoutRef = useRef(null);
    const inputRef = useRef(null);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    const { user } = useSelector(state => state.auth);
    const { tabActive } = useSelector(state => state.app);
    const searchHistoryJSON = user?.userSettings?.SEARCH_HISTORY || null;
    const searchHistory = JSON.parse(searchHistoryJSON) || [];
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        if (tabActive === 'search') {

            inputRef.current.focus();
        }
    }, [tabActive])


    const onSearchItemClick = (s) => {
        const isExist = searchHistory?.findIndex((h) => h._id === s._id);
        if (isExist !== -1) {
            searchHistory?.splice(isExist, 1);
        }
        searchHistory.unshift(s);
        form.setFieldsValue({
            searchInput: ''
        })
        dispatch(setUserDetail(s));
        dispatch(setUserSettings({
            SEARCH_HISTORY: JSON.stringify(searchHistory)
        }))
        setSearchs([]);

    }




    const handleFilterChange = (e) => {
        setIsLoading(true);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(async () => {
            const search = inputRef?.current?.input?.defaultValue
                .toLowerCase()
                .replace(/ /g, '');
            if (!search) {
                setSearchs([]);
            } else
                try {
                    const res = await callAPi(
                        `search?username=${search}`,
                        GET
                    );
                    if (res?.success) {

                        setSearchs(res.data);
                    }
                } catch (error) {
                    setSearchs([]);
                }
            setIsLoading(false);
        }, 300);
    };

    return (
        <SearchWrapper>
            <Form form={form}>

                <div className="title">Tìm kiếm</div>
                <Form.Item name="searchInput" noStyle>

                    <Input ref={inputRef} onChange={handleFilterChange} size="large" prefix={<SearchOutlined />} placeholder="Tìm kiếm" ></Input>
                </Form.Item>
                <div className="search-history" >
                    <div className="search-history-title">
                        Tìm kiếm gần đây
                    </div>
                    <div className="remove-search-history" onClick={() => {
                        dispatch(setUserSettings({
                            SEARCH_HISTORY: JSON.stringify([])
                        }))
                    }}>Xoá tất cả</div>
                </div>
                <div className="search-history-list">
                    {searchs.length > 0 && !isLoading && searchs.map((s, index) => <SearchItem onClick={() => onSearchItemClick(s)} key={s?._id || index} user={s} />)}
                    {searchs.length === 0 && searchHistory?.length > 0 && searchHistory.map((user, index) => <SearchHistory position={index} key={user?._id || index} user={user} />)}
                    {isLoading && <Spin className="search-loading" indicator={antIcon} />}
                </div>
            </Form>
        </SearchWrapper>
    )
}

export default Search