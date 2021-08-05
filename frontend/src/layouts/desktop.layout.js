import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'utils/style.util';
import { Button, Container, Menu, Image } from 'semantic-ui-react';
import { maxWindowWidth } from '../utils/style.util';
import { Link } from 'react-router-dom';

const DesktopLayout = (props) => {
  return (
    <Media greaterThan="mobile" inverted>
      <Menu>
        <Container style={{ width: maxWindowWidth }}>
          <Menu.Item>
            <Link to="/">
              <Image size="tiny" verticalAlign="middle" src="images/LogoTitle.png" />
            </Link>
          </Menu.Item>
          <Menu.Item position="right">
            <Link to="/login">
              <Button basic color="grey" content="Log in" icon="sign-in" />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register">
              <Button basic color="pink" content="Register" icon="signup" />
            </Link>
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
