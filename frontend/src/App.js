import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'styles/styles.css';

import HeaderContainer from 'containers/headerContainer';
import Footer from 'components/Footer/footer';
import { Home } from 'pages';
import wrapper from 'store/configureStore';

function App() {
  return (
    <div className="App">
      <HeaderContainer />
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
      <Footer />
    </div>
  );
}

export default wrapper.withRedux(App);
