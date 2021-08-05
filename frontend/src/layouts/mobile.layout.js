import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { maxWindowWidth, Media } from 'utils/style.util';

const MobileLayout = (props) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const handleSidebarHide = () => setSidebarOpened(false);
  const handleToggle = () => setSidebarOpened(true);

  return (
    <Media as={Sidebar.Pushable} at="mobile">
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          onHide={handleSidebarHide}
          vertical
          direction="right"
          visible={sidebarOpened}
        >
          <Link to="/">
            <Menu.Item active>Home</Menu.Item>
          </Link>
          <Link to="/login">
            <Menu.Item>Log in</Menu.Item>
          </Link>
          <Link to="/register">
            <Menu.Item as="a">Register</Menu.Item>
          </Link>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment textAlign="center" vertical padded>
            <Menu secondary size="large" fixed="top">
              <Link to="/">
                <Menu.Item>
                  <Image size="tiny" verticalAlign="middle" src="images/LogoTitle.png" />
                </Menu.Item>
              </Link>
              <Menu.Item onClick={handleToggle} position="right">
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu>
          </Segment>
          <Container style={{ width: maxWindowWidth, padding: '1rem' }}>{props.children}</Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  );
};

MobileLayout.propTypes = {
  children: PropTypes.node,
};

export default MobileLayout;
