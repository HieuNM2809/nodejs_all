import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Form, Image, Input, Row, Spin } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateMessageIcon } from '../../../assets/icon'
import { GET } from '../../../constants'
import { addConversation, openConversation, toggleConversation, toggleNewConversation } from '../../../redux/conversation/action'
import callAPi from '../../../utils/apiRequest'
import SearchItem from '../../Layout/MainLayout/NavBar/SearchItem'
import ConversationItem from '../ConversationItem'
import { ConversationItemWrapper } from '../ConversationItem/ConversationItem.style'
import { ConversationPopupWrapper } from './ConversationPopup.style'

const ConversationPopup = props => {
  const [searchs, setSearchs] = useState([]);
  const { user } = useSelector(state => state.auth);
  const { conversations, totalActive, newConversationShow } = useSelector(state => state.conversation);
  const [isLoading, setIsLoading] = useState(false);
  const typingTimeoutRef = useRef(null);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const dispatch = useDispatch();
  const handleFilterChange = (e) => {
    setIsLoading(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      const search = e?.target?.defaultValue
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




  const handleOnNewConversation = (s) => {

    setSearchs([]);
    const isExist = conversations.find((cv) => cv.participants[0]._id === s._id || cv.participants[1]._id === s._id);
    dispatch(toggleNewConversation())
    if (isExist) {
      dispatch(openConversation(isExist._id || isExist.fakeId));
    } else {
      dispatch(addConversation({
        participants: [user, s],
        fakeId: s._id,
        messages: [],
        isOpen: totalActive + 1,
      }))
    }
  }

  const conversationOpen = [...conversations].filter((cv) => cv.isOpen);

  return (
    <ConversationPopupWrapper>
      <div className="conversation-hidden">

        {conversationOpen.sort((a, b) => a?.isOpen - b?.isOpen).slice(
          0,
          conversationOpen.length - 3 >= 0 ? conversationOpen.length - 3 : 0
        ).map((cv) => <img onClick={() => dispatch(openConversation(cv._id || cv.fakeId))} alt={cv.participants.find((p) => p._id !== user._id).avatar.url} src={cv.participants.find((p) => p._id !== user._id).avatar.url} />)}
      </div>
      <div className="create-conversation-btn" onClick={() => dispatch(toggleNewConversation())}>

        <CreateMessageIcon />
      </div>
      <div className="conversation-list">

        {conversationOpen.sort((a, b) => a?.isOpen - b?.isOpen).slice(
          conversationOpen.length - 3 >= 0 ? newConversationShow ? (conversationOpen.length - 2) : (conversationOpen.length - 3) : 0,
          conversationOpen.length
        ).map((cv) => <ConversationItem data={cv} />)}
        {newConversationShow && <ConversationItemWrapper>
          <div className="header-new">
            <Row justify="space-between">

              <div className="header-left" style={{
                fontWeight: '600',
                fontSize: '16px'
              }}>
                Tin nhắn mới
              </div>
              <div className="header-right">
                <CloseOutlined onClick={() => dispatch(toggleNewConversation())} />
              </div>
            </Row>

            <Form.Item className='search' name="conversation" label={'Đến'}>
              <Input autoFocus={true} onChange={handleFilterChange}></Input>
            </Form.Item>

          </div>
          <div className="search_list" style={{
            padding: '0 20px'
          }}>
            {searchs.length > 0 && !isLoading && searchs.map((s) => <SearchItem onClick={() => handleOnNewConversation(s)} user={s} />)}
            {isLoading && <Spin className="search-loading" indicator={antIcon} />}

          </div>

        </ConversationItemWrapper>
        }

      </div>
    </ConversationPopupWrapper>
  )
}

ConversationPopup.propTypes = {}

export default ConversationPopup