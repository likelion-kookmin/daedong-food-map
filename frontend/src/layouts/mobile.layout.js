import React, { useState } from 'react';
import { Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { maxWindowWidth } from 'utils/style.util';
import styled from 'styled-components';

const Logo = styled.img`
  height: 30px;
  vertical-align: middle;
`;

function MobileLayout(props) {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const handleSidebarHide = () => setSidebarOpened(false);
  const handleToggle = () => setSidebarOpened(true);
  const { user } = useSelector((state) => state.authentication);

  props.history.listen((location, action) => {
    setSidebarOpened(false);
  });

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <Sidebar.Pushable>
      {user ? (
        <Sidebar
          as={Menu}
          animation="overlay"
          onHide={handleSidebarHide}
          vertical
          direction="right"
          visible={sidebarOpened}
          style={{ fontFamily: 'NS-B' }}
        >
          <div>
            <Menu.Item as="a" style={{ paddingBottom: '10px' }}>
              <Menu.Header>내 정보</Menu.Header>
              <Menu.Menu>
                <Menu.Item href="/reports" style={{ fontSize: '1rem' }}>
                  제보목록
                </Menu.Item>
                <Menu.Item href="/reports" style={{ fontSize: '1rem' }}>
                  신고목록
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
          </div>
          <Link>
            <Menu.Item as="a">제보하기</Menu.Item>
          </Link>
          <Link to="/">
            <Menu.Item as="a" onClick={logout}>
              로그아웃
            </Menu.Item>
          </Link>
        </Sidebar>
      ) : (
        <Sidebar
          as={Menu}
          animation="overlay"
          onHide={handleSidebarHide}
          vertical
          direction="right"
          visible={sidebarOpened}
          style={{ fontFamily: 'NS-B' }}
        >
          <Link to="/login">
            <Menu.Item as="a">로그인</Menu.Item>
          </Link>
          <Link to="/register">
            <Menu.Item as="a">회원가입</Menu.Item>
          </Link>
        </Sidebar>
      )}

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment textAlign="center" vertical padded>
          <Menu secondary size="large" fixed="top">
            <Menu.Item>
              <Link to="/">
                <Logo src="images/LogoTitle.png" />
              </Link>
            </Menu.Item>
            <Menu.Item onClick={handleToggle} position="right">
              <Icon name="sidebar" style={{ margin: 0 }} />
            </Menu.Item>
          </Menu>
        </Segment>
        <Container style={{ width: maxWindowWidth, minHeight: '600px', padding: '1rem' }}>
          {props.children}
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

export default withRouter(MobileLayout);
