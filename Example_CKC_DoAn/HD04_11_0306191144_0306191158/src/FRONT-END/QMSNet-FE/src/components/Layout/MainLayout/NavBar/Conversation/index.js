import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { ConversationWrapper } from './Conversation.style'
import { CreateMessageIcon } from '../../../../../assets/icon'
import { Avatar, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import AvatarCard from '../../../../Common/AvatarCard';
import { timeAgo } from '../../../../../utils/time_utils';
import { useDispatch, useSelector } from 'react-redux'
import ConversationItem from './ConversationItem'
import { getConversation, toggleNewConversation } from '../../../../../redux/conversation/action'


const Conversation = props => {
    const { conversations } = useSelector(state => state.conversation);
    const dispatch = useDispatch();
    const inputRef = useRef();
    const [searchs, setSearchs] = useState([]);

    useEffect(() => {
        dispatch(getConversation());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleFilterChange = (e) => {
        if (conversations.length > 0) {

            const search = inputRef?.current?.input?.value
                .toLowerCase()
                .replace(/ /g, '');
            if (!search) {
                setSearchs([]);
            } else {
                const res = conversations.filter((cv) => cv.participants.some((user) => user.username.includes(search)));
                setSearchs(res);
            }
        }
    };
    return (
        <ConversationWrapper>
            <div className="header">
                <div className="title">
                    Chat
                </div>
                <CreateMessageIcon className="create-icon" onClick={() => dispatch(toggleNewConversation())} />
            </div>
            <Input ref={inputRef} onChangeCapture={handleFilterChange} size="large" prefix={<SearchOutlined />} placeholder="Tìm kiếm" ></Input>
            <div className="body">
                {!inputRef?.current?.input?.value && conversations.map((cv) => cv?._id && <ConversationItem key={cv?._id} data={cv} />)}
                {searchs.length > 0 && inputRef?.current?.input?.value && searchs.map((cv) => cv?._id && <ConversationItem data={cv} />)}

            </div>


        </ConversationWrapper>
    )
}

Conversation.propTypes = {}

export default Conversation