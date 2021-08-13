import React, { useEffect } from 'react';
import { LOAD_REVIEW_REQUEST } from 'reducers/review';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';

import ReviewCard from 'components/Review/ReviewCard';

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

const ReportListPage = () => {
  const dispatch = useDispatch();
  const { reviews, loadReviewsLoading } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch({
      type: LOAD_REVIEW_REQUEST,
    });
  }, [dispatch]);

  return (
    <div>
      <Section style={{ margin: '1.5rem 0 3rem  0' }}>
        <Name>내 리뷰</Name>
      </Section>
      {loadReviewsLoading ? (
        <Dimmer active inverted>
          <Loader size="huge">Loading</Loader>
        </Dimmer>
      ) : (
        <Grid stackable columns={2}>
          {reviews.map((review) => (
            <ReviewCard data={review} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ReportListPage;
