import React from 'react';
import LoginButton from './loginButton';
import styled from 'styled-components';
import { shadow, media } from 'utils/style.utils';

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2;
  ${shadow(1)}
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
         width: 992px;
     `}

  ${media.tablet`
         width: 100%;
     `}
`;

const Logo = styled.img`
  width: auto;
  height: 40px;
  background-color: transparent;
  position: fixed;
  left: 5%;
  top: 5px;
  transform: translateX(-50%);
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

function Header() {
  return (
    <Positioner>
      <Background>
        <HeaderContents>
          <a href="/">
            <Logo src="images/LogoTitle.png" />
          </a>
          <Spacer />
          <LoginButton text="LOGIN" />
        </HeaderContents>
      </Background>
    </Positioner>
  );
}

export default Header;
