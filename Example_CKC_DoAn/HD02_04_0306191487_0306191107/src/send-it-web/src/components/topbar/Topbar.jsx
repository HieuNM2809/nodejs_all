import React, { useState } from 'react';
import './topbar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UnopDropdown from 'unop-react-dropdown';
import Popup from 'reactjs-popup';
import Profile from '../profile/Profile';
import { LOGOUT } from '../../actions/actionType';
import BackgroundConversation from '../background_conversation/BackgroundConversation';

const Topbar = () => {
  const user = useSelector((state) => state.authReducer.authData);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handler = () => {
    setOpen(!open);
  };

  const handlerLogout = () => {
    dispatch({ type: LOGOUT });
  };
  return (
    <div className='topbar__container'>
      <div className='topbar__space'></div>

      <div className='topbar__left'>
        <Link to='/' className='topbar__left--link'>
          <span className='topbar__left--title'>Send It</span>
        </Link>
      </div>
      <div className='topbar__right'>
        <UnopDropdown
          delay={300}
          align='LEFT'
          onAppear={handler}
          onDisappearStart={handler}
          trigger={
            <div className='topbar__right--click'>
              <img
                crossOrigin='anonymous'
                src={user.isGoogle === undefined ? user.imageUrl : user.image}
                alt=''
                className='topbar__right--img'
              />
              <div className='topbar__right--title'>
                {user.isGoogle === undefined ? user.name : user.full_name}
              </div>
            </div>
          }
        >
          <ul
            className={`animatedDropdownStyles openAnimation ${
              !open ? 'closeAnimation' : ''
            }`}
          >
            <li className='animatedDropdownStyles__item'>
              <Popup
                contentStyle={{ width: '700px' }}
                modal
                trigger={
                  <button className='animatedDropdownStyles__item--button'>
                    Profile
                  </button>
                }
              >
                {(close) => <Profile close={close} />}
              </Popup>
            </li>
            <li className='animatedDropdownStyles__item'>
              <Popup
                contentStyle={{ width: '700px' }}
                modal
                trigger={
                  <button className='animatedDropdownStyles__item--button'>
                    Background
                  </button>
                }
              >
                {(close) => <BackgroundConversation close={close} />}
              </Popup>
            </li>
            <li className='animatedDropdownStyles__item'>
              <button
                onClick={handlerLogout}
                className='animatedDropdownStyles__item--button'
              >
                Logout
              </button>
            </li>
          </ul>
        </UnopDropdown>
      </div>
    </div>
  );
};

export default Topbar;
