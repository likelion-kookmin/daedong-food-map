import React from 'react';
import styled from 'styled-components';
import { shadow } from 'utils/style.utils';
const LoginBtn = styled.button`
  font-family: 'NS-B';
  color: black;
  padding: 0.3rem 0.5rem;
  border: none;
  background: transparent;
  border-radius: 2px;
  text-decoration: none;
  transition: 0.2s all;
  font-size: 15px;

  &:hover {
    background: gray;
    color: white;
    ${shadow(1)}
  }

  &:active {
    transform: translateY(1px);
  }
`;

function LoginButton(props) {
  return <LoginBtn> {props.text} </LoginBtn>;
}

export default LoginButton;
