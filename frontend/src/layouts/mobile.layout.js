import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { Media } from 'utils/style.util';

const MobileLayout = (props) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const handleSidebarHide = () => setSidebarOpened(false);
  const handleToggle = () => setSidebarOpened(true);

  return (
    <Media as={Sidebar.Pushable} at="mobile">
      <Sidebar.Pushable>
        <Sidebar as={Menu} animation="overlay" onHide={handleSidebarHide} vertical direction="right" visible={sidebarOpened}>
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Log in</Menu.Item>
          <Menu.Item as="a">Register</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment textAlign="center" vertical padded>
            <Menu secondary size="large" fixed="true">
              <Menu.Item>
                <Image size="tiny" verticalAlign="middle" src="images/LogoTitle.png" />
              </Menu.Item>
              <Menu.Item onClick={handleToggle} position="right">
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu>
          </Segment>
          {props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  );
};

MobileLayout.propTypes = {
  children: PropTypes.node,
};

export default MobileLayout;
