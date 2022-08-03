import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './member.scss';

export default function Member({ user, handleSelectedUser }) {
  // const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //   useEffect(() => {
  //     const friendId = member.members.find((m) => m !== currentUser._id);

  //     const getUser = async () => {
  //       try {
  //         const res = await axios("/users?userId=" + friendId);
  //         setUser(res.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     getUser();
  //   }, [currentUser, member]);

  return (
    <div className='member' onClick={() => handleSelectedUser(user)}>
      <img
        className='member__img'
        // src={
        //   user?.profilePicture
        //     ? PF + user.profilePicture
        //     : PF + 'person/noAvatar.png'
        // }
        src={user.partnerAvt}
        alt={user.partnerAvt}
      />
      <div className='member__group'>
        <span className='member__name'>{user?.partnerName}</span>
      </div>
    </div>
  );
}

Member.propTypes = {
  user: PropTypes.object,
  handleSelectedUser: PropTypes.func,
};
