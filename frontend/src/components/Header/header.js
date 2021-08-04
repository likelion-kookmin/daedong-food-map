import React from 'react';
import LoginButton from './loginButton';
import styled from 'styled-components';
import { media } from 'utils/style.util';

import { Button, Segment, Icon } from 'semantic-ui-react';

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2;
  border-bottom: 1px solid #ededed;
`;

export const Background = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: center;
  height: auto;
`;

export const HeaderContents = styled.div`
  width: 1300px;
  height: 47px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
  padding-left: 1rem;

  ${media.wide`
         width: 1300px;
     `}

  ${media.tablet`
         width: 100%;
     `}
`;

const Logo = styled.img`
  width: auto;
  height: 40px;
  background-color: transparent;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Header = () => {
  return (
    <Positioner>
      <Background>
        <HeaderContents>
          <a href='/'>
            <Logo src='images/LogoTitle.png' />
          </a>
          <Spacer />
          <Button
            basic
            color='gray'
            content='Log in'
            icon='sign-in'
          />
          <Button
            basic
            color='pink'
            content='Register'
            icon='signup'
          />
        </HeaderContents>
      </Background>
    </Positioner>
  );
};

export default Header;
