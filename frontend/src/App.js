import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'styles/styles.css';

import {
  Home,
  Signin,
  Signup,
  PlaceDetailPage,
  ReviewListPage,
  ReportListPage,
  InquiryListPage,
  BookmarkListPage,
  PolicyPage,
} from 'pages';
import wrapper from 'store/configureStore';
import ResponsiveLayout from 'layouts/responsive.layout';
import PrivateRoute from 'components/Route/privateRoute';

const App = () => {
  return (
    <Router>
      <ResponsiveLayout>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/register" component={Signup} />
        <PrivateRoute exact path="/reviews" component={ReviewListPage} />
        <PrivateRoute exact path="/reports" component={ReportListPage} />
        <PrivateRoute exact path="/inquiries" component={InquiryListPage} />
        <PrivateRoute exact path="/bookmarks" component={BookmarkListPage} />
        <Route path="/places/:id" component={PlaceDetailPage} />
        <Route path="/policies" component={PolicyPage} />
      </ResponsiveLayout>
    </Router>
  );
};

export default wrapper.withRedux(App);
