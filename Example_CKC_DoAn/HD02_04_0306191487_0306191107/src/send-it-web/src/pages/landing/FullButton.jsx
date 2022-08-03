import React from 'react';
import styled from 'styled-components';

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className='animate pointer radius8'
      onClick={action ? () => action() : null}
      border={border}
    >
      <a
        href='/register'
        // className='radius8 lightBg'
        style={{ padding: '10px 15px', color: '#fff' }}
      >
        {title}
      </a>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? '#707070' : '#f47c7c')};
  background-color: ${(props) => (props.border ? 'transparent' : '#f47c7c')};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? '#707070' : '#fff')};
  :hover {
    background-color: ${(props) => (props.border ? 'transparent' : '#ef9f9f')};
    border: 1px solid #ef9f9f;
    color: ${(props) => (props.border ? '#7620ff' : '#fff')};
  }
`;
