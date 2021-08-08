import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { Icon, Label } from 'semantic-ui-react';

const InquiryListPage = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_PLACE_REQUEST,
  //     id: id,
  //   });
  // }, [dispatch, id]);

  return <div>inquiry</div>;
};

export default InquiryListPage;
