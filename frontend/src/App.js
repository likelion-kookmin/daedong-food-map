import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'styles/styles.css';

import { Home, Signin, Signup } from 'pages';
import wrapper from 'store/configureStore';
import ResponsiveLayout from 'layouts/responsive.layout';
import PlaceDetailPage from 'pages/Place/placeDetail.page';

function App() {
  return (
    <Router>
      <ResponsiveLayout>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/reports" /> {/* 유저 제보목록 페이지 */}
        <Route exact path="/inquiries" /> {/* 유저 신고목록 페이지 */}
        <Route path="/places/:id" component={PlaceDetailPage} />
      </ResponsiveLayout>
    </Router>
  );
}

export default wrapper.withRedux(App);
