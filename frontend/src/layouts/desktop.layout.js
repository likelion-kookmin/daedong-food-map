import React from 'react';
import PropTypes from 'prop-types';
import { Media } from 'utils/style.util';
import { Button, Container, Menu, Image } from 'semantic-ui-react';

const DesktopLayout = ({ children }) => {
  return (
    <Media greaterThan="mobile" inverted>
      <Menu size="large">
        <Container>
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
      {children}
    </Media>
  );
};

DesktopLayout.propTypes = {
  children: PropTypes.node,
};

export default DesktopLayout;
