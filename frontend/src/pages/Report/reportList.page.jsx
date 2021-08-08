import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';

const ReportListPage = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_PLACE_REQUEST,
  //     id: id,
  //   });
  // }, [dispatch, id]);

  return <div>report</div>;
};

export default ReportListPage;
