import React, { useEffect } from 'react';
import { LOAD_INQUIRIES_REQUEST } from 'reducers/inquiry';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';

import InquiryCard from 'components/Inquiry/inquiryCard';

const Section = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
  gap: 0.2rem;
`;

const Name = styled.div`
  font-family: 'NS-EB';
  font-size: 2rem;
  color: #3e3e3e;

  ${media.phone`
    font-size: 1.7rem;
  `};
`;

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
      <Section style={{ margin: '1.5rem 0 3rem  0' }}>
        <Name>나의 신고내역</Name>
      </Section>
      {loadInquiriesLoading ? (
        <Dimmer active inverted>
          <Loader size="huge">Loading</Loader>
        </Dimmer>
      ) : (
        <Grid stackable columns={2}>
          {inquiries.map((inquiry) => (
            <InquiryCard inquiry={inquiry} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default InquiryListPage;
