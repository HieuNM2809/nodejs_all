/* eslint-disable react-hooks/exhaustive-deps */
import { Clear } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user_detail_popup.scss';
import { stringToTime } from '../../utils/common';
import * as api from '../../API/indexAPI';

const UserDetailAdmin = ({ close, user }) => {
  const [userStatistical, setUserStatistical] = useState(null);
  //   {
  //     conversations: 4;
  //     email: 'vinh4@gmail.com';
  //     full_name: 'Vinh 4';
  //     id: 0;
  //     idUser: '62970504e06286e11b7e4443';
  //     image: 'http://localhost:8800/uploads/1655473511593_elena-sai-991.jpg';
  //     isAdmin: false;
  //   }
  useEffect(() => {
    const getUserStatistical = async () => {
      const res = await api.userStatisticalApi(user.idUser);
      setUserStatistical(res.data);
    };
    getUserStatistical();
  }, [user.idUser]);

  return (
    <>
      <div className='usdt__popup p-4 d-flex flex-column text-center'>
        <Clear className='usdt__popup--exit' onClick={close} />
        <div className='mb-5'>
          <img
            className='usdt__popup--img'
            src={user.image}
            alt={user.image}
            width='80'
            height='80'
          />
        </div>
        <div>
          <div className='text-start mb-3'>
            <span className='statistical__title p-1 mr-3'>Name:</span>
            <span> {userStatistical?.full_name}</span>
          </div>
          <div className='text-start mb-3'>
            <span className='statistical__title p-1 mr-3'>Email:</span>
            <span> {userStatistical?.email}</span>
          </div>
          <div className='text-start mb-3'>
            <span className='statistical__title p-1 mr-3'>Join Day:</span>
            <span> {stringToTime(userStatistical?.createdAt)}</span>
          </div>
          {!userStatistical?.bestFriend.noBf ? (
            <div className='text-start mb-3'>
              <span>{`${userStatistical?.full_name}'s most like messaging with `}</span>
              <span className='statistical__title p-1 mb-1'>
                {userStatistical?.bestFriend.name}
              </span>
              <br />
              <span>, {`they sent total `}</span>
              <span className='statistical__title p-1 '>{`${userStatistical?.bestFriend.totalMessage} messages.`}</span>
            </div>
          ) : (
            <>
              <div className='text-start mb-3'>
                <span className='statistical__title p-1 mb-1'>
                  {userStatistical?.bestFriend.name}
                </span>
              </div>
            </>
          )}

          <div className='text-start mb-3'>
            <span>This Year {userStatistical?.full_name} sent total </span>
            <span className='statistical__title p-1 mr-3'>
              {userStatistical?.todayTotalMessageSent} messages
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailAdmin;
