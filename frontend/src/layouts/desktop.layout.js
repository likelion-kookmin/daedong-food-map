import React, { Fragment, useState } from 'react';
import { maxWindowWidth } from 'utils/style.util';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Dropdown, Menu, Icon } from 'semantic-ui-react';
import { lighten, darken } from 'polished';

import NewReport from 'components/Report/NewReportModal';

const Logo = styled.img`
  width: 8rem;
  margin: 10px 0;
  vertical-align: middle;
`;

const Btn = styled.button`
  font-family: 'NS-B';
  padding: 0.6435rem 1rem;
  text-decoration: none;
  transition: 0.1s all;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const PrimaryBtn = styled(Btn)`
  color: #ffffff;
  background-color: #f25c69;
  &:hover {
    background: ${lighten(0.1, '#F25C69')};
  }
`;

const SecondaryBtn = styled(Btn)`
  color: #3e3e3e;
  background-color: #f2f2f2;
  margin-right: 1rem;
  &:hover {
    background: ${darken(0.1, '#F2F2F2')};
  }
`;

const DropText = styled.div`
  font-family: 'NS-R';
  color: #ffffff;
`;

const ContainerStyle = {
  width: maxWindowWidth,
  display: 'flex',
  alignItems: 'center',
  padding: '0.2rem 2rem',
};

const DesktopLayout = (props) => {
  const { user } = useSelector((state) => state.authentication);
  const [newReportOpened, setNewReportOpened] = useState(false);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  props.history.listen((location, action) => {
    window.scrollTo(0, 0);
  });

  const openNewReportModal = () => {
    setNewReportOpened(true);
  };

  return (
    <Fragment>
      <NewReport setOpen={setNewReportOpened} open={newReportOpened} />
      <Menu>
        {user ? (
          <Container style={ContainerStyle}>
            <Link to="/">
              <Logo src={process.env.PUBLIC_URL + '/images/LogoTitle.png'} />
            </Link>
            <div style={{ flexGrow: 1 }}></div>
            <SecondaryBtn onClick={openNewReportModal}>
              <Icon name="mail" style={{ marginRight: '0.5rem' }} />
              제보하기
            </SecondaryBtn>
            <Dropdown
              icon="user"
              simple
              className="button icon"
              direction="left"
              style={{ backgroundColor: '#F25C69', color: '#ffffff' }}
            >
              <Dropdown.Menu
                style={{
                  backgroundColor: '#F27983',
                  borderRadius: '5px 0 5px 5px',
                  color: '#ffffff',
                }}
              >
                <Link to="/bookmarks">
                  <Dropdown.Item as="a">
                    <DropText>북마크 목록</DropText>
                  </Dropdown.Item>
                </Link>
                <Link to="/reviews">
                  <Dropdown.Item as="a">
                    <DropText>리뷰 목록</DropText>
                  </Dropdown.Item>
                </Link>
                <Link to="/reports">
                  <Dropdown.Item as="a">
                    <DropText>제보 내역</DropText>
                  </Dropdown.Item>
                </Link>
                <Link to="/inquiries">
                  <Dropdown.Item as="a">
                    <DropText>신고 내역</DropText>
                  </Dropdown.Item>
                </Link>
                <Dropdown.Item as="a" onClick={logout}>
                  <DropText>로그아웃</DropText>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        ) : (
          <Container style={ContainerStyle}>
            <Link to="/">
              <Logo src={process.env.PUBLIC_URL + '/images/LogoTitle.png'} />
            </Link>
            <div style={{ flexGrow: 1 }}></div>
            <Link to="/login">
              <SecondaryBtn>
                <Icon name="sign in" />
                로그인
              </SecondaryBtn>
            </Link>
            <Link to="/register">
              <PrimaryBtn>
                <Icon name="signup" />
                회원가입
              </PrimaryBtn>
            </Link>
          </Container>
        )}
      </Menu>
      <Container style={{ width: maxWindowWidth, padding: '2rem', minHeight: window.outerHeight }}>
        {props.children}
      </Container>
    </Fragment>
  );
};

export default withRouter(DesktopLayout);
