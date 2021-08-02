import React from 'react';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const LoginBtn = styled(Button)`
  font-family: 'NS-B';
`;

function LoginButton(props) {
  return <LoginBtn> {props.text} </LoginBtn>;
}

export default LoginButton;
