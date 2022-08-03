import React, { useState } from 'react';
import styled from 'styled-components';
import './topnavbar.scss';

// Assets

import BurgerIcon from '../../assets/svg/BurgerIcon';

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);

  return (
    <>
      <Wrapper
        className='flexCenter animate whiteBg'
        style={y > 100 ? { height: '60px' } : { height: '80px' }}
      >
        <NavInner className='container flexSpaceCenter'>
          <div className='pointer flexNullCenter'>
            <img
              width='44px'
              height='44px'
              src='./images/send-it-beta-logo.png'
              alt=''
            />
            <h1
              style={{ marginLeft: '15px' }}
              className='send__it font20 extraBold'
            >
              Send It
            </h1>
          </div>
          <BurderWrapper className='pointer'>
            <BurgerIcon />
          </BurderWrapper>

          <UlWrapperRight className='flexNullCenter'>
            <li className='semiBold font15 pointer'>
              <a
                href='/login'
                style={{ padding: '10px 30px 10px 0', color: '#f47c7c' }}
              >
                Log in
              </a>
            </li>
            <li className='semiBold font15 pointer flexCenter'>
              <a
                href='/register'
                className='radius8 lightBg'
                style={{ padding: '10px 15px', color: '#f47c7c' }}
              >
                Get Started
              </a>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`;
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;
