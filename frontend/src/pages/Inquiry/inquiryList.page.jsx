import React, { useEffect } from 'react';
import { LOAD_INQUIRIES_REQUEST } from 'reducers/inquiry';

import { useDispatch, useSelector } from 'react-redux';
import { Divider, Segment, Dimmer, Loader } from 'semantic-ui-react';

import InquiryCard from 'components/Inquiry/inquiryCard';

const InquiryListPage = () => {
  const dispatch = useDispatch();
  const { inquiries, loadInquiriesLoading } = useSelector((state) => state.inquiry);

  useEffect(() => {
    dispatch({
      type: LOAD_INQUIRIES_REQUEST,
    });
  }, [dispatch]);

  return (
    <div>
      <h1>신고 목록</h1>
      <Divider />
      {loadInquiriesLoading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader size="huge">Loading</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <Segment.Group>
          {inquiries.map((inquiry) => (
            <InquiryCard report={inquiry} />
          ))}
        </Segment.Group>
      )}
    </div>
  );
};

export default InquiryListPage;
