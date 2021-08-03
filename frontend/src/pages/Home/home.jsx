import React, { Fragment } from 'react';
import LoginForm from 'components/LoginForm';

function Home() {
  return (
    <Fragment>
      <img src="images/LogoTitle.png" style={{ width: '500px' }} alt="Logo" />
      <p>Hello World!</p>
      <LoginForm />
    </Fragment>
  );
}

export default Home;
