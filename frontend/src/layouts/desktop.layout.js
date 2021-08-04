import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'utils/style.util';
import { Button, Container, Menu, Image } from 'semantic-ui-react';
import { maxWindowWidth } from '../utils/style.util';

const DesktopLayout = (props) => {
  return (
    <Media greaterThan="mobile" inverted>
      <Menu>
        <Container style={{ width: maxWindowWidth }}>
          <Menu.Item>
            <Image size="tiny" verticalAlign="middle" src="images/LogoTitle.png" />
          </Menu.Item>
          <Menu.Item position="right">
            <Button basic color="gray" content="Log in" icon="sign-in" />
          </Menu.Item>
          <Menu.Item>
            <Button basic color="pink" content="Register" icon="signup" />
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{ width: maxWindowWidth, padding: '2rem' }}>{props.children}</Container>
    </Media>
  );
};

DesktopLayout.propTypes = {
  children: PropTypes.node,
};

export default DesktopLayout;
