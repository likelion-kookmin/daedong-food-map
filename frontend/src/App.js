import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'styles/styles.css';

import { Home, Signin, Signup } from 'pages';
import wrapper from 'store/configureStore';
import ResponsiveLayout from 'layouts/responsive.layout';

function App() {
  return (
    <Router>
      <ResponsiveLayout>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/register" component={Signup} />
      </ResponsiveLayout>
    </Router>
  );
}

export default wrapper.withRedux(App);
