import React, { Fragment, useState } from 'react';
import { Container, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { maxWindowWidth } from 'utils/style.util';
import styled from 'styled-components';

import NewReport from 'components/Report/NewReportModal';

const Logo = styled.img`
  height: 27px;
  vertical-align: middle;
`;

const MobileLayout = (props) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [newReportOpened, setNewReportOpened] = useState(false);
  const handleSidebarHide = () => setSidebarOpened(false);
  const handleToggle = () => setSidebarOpened(true);
  const { user } = useSelector((state) => state.authentication);

  props.history.listen((location, action) => {
    setSidebarOpened(false);
    window.scrollTo(0, 0);
  });

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const openNewReportModal = () => {
    setSidebarOpened(false);
    setNewReportOpened(true);
  };

  return (
    <Fragment>
      <NewReport setOpen={setNewReportOpened} open={newReportOpened} />
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
              <Menu.Item>
                <Menu.Header>내 정보</Menu.Header>
                <div>
                  <Menu.Item href="/bookmarks" style={{ fontSize: '1rem' }}>
                    북마크 목록
                  </Menu.Item>
                </div>
                <div>
                  <Menu.Item href="/reports" style={{ fontSize: '1rem' }}>
                    제보목록
                  </Menu.Item>
                </div>
                <div>
                  <Menu.Item href="/inquiries" style={{ fontSize: '1rem' }}>
                    신고목록
                  </Menu.Item>
                </div>
              </Menu.Item>
            </div>
            <div>
              <Menu.Item as="a" onClick={openNewReportModal}>
                제보하기
              </Menu.Item>
            </div>
            <Menu.Item as="a" onClick={logout}>
              로그아웃
            </Menu.Item>
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
          <Segment size="large" textAlign="center" vertical padded>
            <Menu secondary fixed="top">
              <Menu.Item>
                <Link to="/">
                  <Logo src={process.env.PUBLIC_URL + '/images/LogoTitle.png'} />
                </Link>
              </Menu.Item>
              <Menu.Item onClick={handleToggle} position="right">
                <Icon name="sidebar" style={{ margin: 0 }} />
              </Menu.Item>
            </Menu>
          </Segment>
          <Container
            style={{ width: maxWindowWidth, padding: '2rem', minHeight: window.outerHeight }}
          >
            {props.children}
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Fragment>
  );
};

export default withRouter(MobileLayout);
