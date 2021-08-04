import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'styles/styles.css';

import { Home } from 'pages';
import wrapper from 'store/configureStore';
import ResponsiveLayout from 'layouts/responsive.layout';

function App() {
  return (
    <ResponsiveLayout>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </ResponsiveLayout>
  );
}

export default wrapper.withRedux(App);
