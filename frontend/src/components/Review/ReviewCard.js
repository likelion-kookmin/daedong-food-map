import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PLACE_REQUEST } from 'reducers/place';
import { Link } from 'react-router-dom';
import { Label, Grid, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';

import Review from './Review';

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 0.8rem 1.5rem;
  position: relative;
  background-color: #ffffff;
  border: 1px solid #a1a1a1;
  border-radius: 10px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  margin: 0.1rem 0;
  gap: 0.2rem;
`;

const Name = styled.div`
  font-family: 'NS-EB';
  font-size: 1.5rem;
  color: #0c43b6;
  margin-right: 1rem;

  ${media.phone`
    font-size: 1.7rem;
  `};
`;

const Text = styled.div`
  font-family: 'NS-R';
  font-size: 1rem;
  color: #707070;
`;

const Tag = styled(Label)`
  font-family: 'NS-R';
`;

const ReviewCard = (props) => {
  const { singlePlace, loadPlaceLoading } = useSelector((state) => state.place);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_REQUEST,
      id: props.data.place,
    });
  }, [dispatch, props.data.place]);

  return (
    <Grid.Column>
      <Container className={loadPlaceLoading ? 'loading' : ''}>
        <Section style={{ marginBottom: '0.5rem' }}>
          <Link to={`/places/${singlePlace?.id}`}>
            <Name>{singlePlace?.name}</Name>
          </Link>
          {singlePlace?.tags.map((tag) => {
            return <Tag>{tag}</Tag>;
          })}
        </Section>
        <Section style={{ marginBottom: '1rem' }}>
          <Text>{singlePlace?.address}</Text>
        </Section>
        <Divider />
        <Grid>
          <Review data={props.data} size="tiny" />
        </Grid>
      </Container>
    </Grid.Column>
  );
};

export default ReviewCard;
