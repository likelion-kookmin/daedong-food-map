import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Media } from 'utils/style.util';
import { Button, Container, Menu, Image } from 'semantic-ui-react';
import { maxWindowWidth } from '../utils/style.util';
import { Link } from 'react-router-dom';

const DesktopLayout = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };
  return (
    <Media greaterThan="mobile" inverted>
      <Menu>
        <Container style={{ width: maxWindowWidth }}>
          <Menu.Item>
            <Link to="/">
              <Image size="tiny" verticalAlign="middle" src="images/LogoTitle.png" />
            </Link>
          </Menu.Item>
          {user && user.access_token ? (
            <Menu.Item position="right">
              <Link to="/">
                <Button basic color="pink" content="Log out" icon="sign-out" onClick={logout} />
              </Link>
            </Menu.Item>
          ) : (
            <Fragment>
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
            </Fragment>
          )}
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
