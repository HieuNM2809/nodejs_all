import { Clear, Search } from '@material-ui/icons';
import React, { useContext, useState, useEffect } from 'react';
import Member from '../member/Member';
import axios from 'axios';
import './newGroup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CONVERSATION } from '../../actions/actionType';
import { SocketContext } from '../../actions/context';
import * as api from '../../API/indexAPI';

const SelectedItem = ({ user, handleRemoveFromSelected }) => {
  return (
    <div
      className='newGroup__member--selectedItem'
      onClick={() => handleRemoveFromSelected(user.id)}
    >
      <img
        src={user.image}
        alt={user.image}
        className='newGroup__member--selectedImg'
      />
      <span className='newGroup__member--selectedName'>{user.name}</span>
      <Clear className='newGroup__member--clear' />
    </div>
  );
};

const NewGroup = ({ close }) => {
  const [selected, setSelected] = useState([]);
  const [groupLengthCheck, setGroupLengthCheck] = useState('');
  const [status, setStatus] = useState(false);
  const [contacts, setContacts] = useState([]);
  const dispatch = useDispatch();

  const { createNewGroupChat } = useContext(SocketContext);

  const listConversation = useSelector(
    (state) => state.conversationReducer.conversationData
  );

  const userCreator = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const contactss = listConversation.filter(
      (contact) =>
        (contact.isGroup === false) & !contact.partnerName.includes('Saved')
    );
    setContacts(contactss);
  }, []);

  const handleSelectedUser = (user) => {
    const check = selected.findIndex((u) => u.name === user.partnerName);
    if (check === -1) {
      setSelected([
        ...selected,
        {
          id: user.partnerId,
          name: user.partnerName,
          email: user.partnerEmail,
          image: user.partnerAvt,
        },
      ]);
    } else {
      setSelected((prevState) =>
        prevState.filter((u) => u.id !== user.partnerId)
      );
    }
    setStatus(true);
  };

  const handleRemoveFromSelected = (id) => {
    setSelected((prevState) => prevState.filter((u) => u.id !== id));
  };

  const updateListConv = (userId) => {
    return api.getConversation(userId);
  };

  const handleCreateNewGroup = async () => {
    if (selected.length > 1) {
      setGroupLengthCheck('');
      const newGroupConversation = [
        ...selected,
        {
          id: userCreator._id,
          fullname: userCreator.full_name,
          email: userCreator.email,
          role: 1,
        },
      ];
      const res = await axios.post('/conversation', newGroupConversation);

      //const updateListConvData = await updateListConv(userCreator._id);
      dispatch({
        type: GET_CONVERSATION,
        data: [
          {
            id: res.data._id,
            partnerName: res.data.display_name,
            partnerAvt: res.data.display_img,
            lastSender: '',
            lastSendAt: res.data.last_sendAt,
            isGroup: true,
            isRead: true,
            imageList: [],
            fileList: [],
            members: newGroupConversation,
            lastMessageId: '',
            lastMessage: '',
          },
          ...listConversation,
        ],
      });
      //socket
      createNewGroupChat(selected, res.data._id);
    } else {
      setGroupLengthCheck('Please add more friend to create a new group');
    }
  };

  return (
    <div className='newGroup'>
      <h3 className='newGroup__title'>New Group</h3>

      {/* <div>
        <input
          type='text'
          placeholder='Enter group name'
          name='name'
          className='newGroup__inputName'
        />
      </div> */}
      <div className='newGroup__member'>
        {/* <div className='newGroup__member--input'>
          <Search />
          <input
            type='text'
            placeholder='Search member'
            className='newGroup__member--inputSearch'
          />
        </div> */}
        <div className='newGroup__member--selected'>
          {selected.map((user) => {
            return (
              <SelectedItem
                key={user.id}
                user={user}
                handleRemoveFromSelected={handleRemoveFromSelected}
              />
            );
          })}
        </div>
        <div className='newGroup__member--list'>
          {contacts.map((user) => {
            return (
              <Member
                key={user.partnerId}
                user={user}
                status={status}
                handleSelectedUser={handleSelectedUser}
              />
            );
          })}
        </div>
      </div>
      <h6 style={{ color: 'red' }}>{groupLengthCheck}</h6>
      <div className='newGroup__button'>
        <button className='newGroup__button--btn' onClick={close}>
          Cancel
        </button>
        <button
          onClick={handleCreateNewGroup}
          className='newGroup__button--btn'
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewGroup;
