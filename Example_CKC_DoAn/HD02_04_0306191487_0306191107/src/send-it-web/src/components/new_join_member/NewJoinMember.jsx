import React, { useEffect, useState } from 'react';
import './widgetsSmall.scss';
import { Visibility } from '@material-ui/icons';
import { useSelector } from 'react-redux';

const NewJoinMember = () => {
  const user = useSelector((state) => state.usersReducer.users);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (user !== null) {
      setData(
        user.map((user, index) => {
          return {
            id: index,
            idUser: user._id,
            full_name: user.full_name,
            image: user.image,
            conversations: user.conversations.length,
            email: user.email,
            isAdmin: user.isAdmin ? true : false,
          };
        })
      );
    }
  }, [user]);

  return (
    <div className='widgetsSmall'>
      <span className='widgetsSmallTitle'>New Join Member</span>
      <ul className='widgetsSmallList'>
        {data &&
          data.map((user) => {
            return (
              <li className='widgetsSmallItem'>
                <img src={user.image} alt='' className='widgetsSmallImg' />
                <div className='widgetsSmallUser'>
                  <span className='widgetsSmallUsername'>{user.full_name}</span>
                  <span className='widgetsUserSmallJob'>
                    {user.isAdmin ? 'Admin' : 'Customer'}
                  </span>
                </div>
                <button className='widgetsSmallButton'>
                  <Visibility className='widgetsSmallIcon' />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default NewJoinMember;
