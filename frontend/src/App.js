import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'styles/styles.css';

import { Home, ReportListPage, Signin, Signup, PlaceDetailPage, InquiryListPage } from 'pages';
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
        <PrivateRoute exact path="/reports" component={ReportListPage} />
        <PrivateRoute exact path="/inquiries" component={InquiryListPage} />
        <Route path="/places/:id" component={PlaceDetailPage} />
      </ResponsiveLayout>
    </Router>
  );
};

export default wrapper.withRedux(App);
