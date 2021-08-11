import React from 'react';
import styled from 'styled-components';
import { Grid, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';

const Section = styled.div`
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
`;

const Text = styled.div`
  font-family: 'NS-R';
  font-size: 1.2rem;
  color: #707070;
`;

const Review = (props) => {
  const date = moment(props.data.updatedAt).format('YYYY.MM.DD');

  return (
    <Grid.Row padded="vertically">
      <Grid.Column textAlign="center" width={4}>
        <Image
          circular
          size="small"
          src={
            props.data.userProfile
              ? props.data.userProfile
              : 'https://react.semantic-ui.com/images/wireframe/square-image.png'
          }
          style={{ display: 'inline-block', marginBottom: '1rem' }}
        />
        <Text>{props.data.userNickname ? props.data.userNickname : '익명'}</Text>
      </Grid.Column>
      <Grid.Column width={12}>
        <Grid stackable verticalAlign="bottom" columns={2} style={{ marginBottom: '1rem' }}>
          <Grid.Column width={4}>
            <Section style={{ alignItems: 'baseline' }}>
              {[...Array(props.data.score)].map((n) => {
                return (
                  <Icon
                    name="star"
                    size="large"
                    style={{ color: '#F25C69', marginRight: '0.3rem' }}
                  />
                );
              })}
              {[...Array(5 - props.data.score)].map((n) => {
                return (
                  <Icon
                    name="star outline"
                    size="large"
                    style={{ color: '#F25C69', marginRight: '0.3rem' }}
                  />
                );
              })}
              <Text style={{ margin: '0 3rem 0 1rem' }}>{props.data.score}</Text>
            </Section>
          </Grid.Column>
          <Grid.Column width={4}>
            <Section style={{ alignItems: 'baseline' }}>
              <Text>{date}</Text>
            </Section>
          </Grid.Column>
        </Grid>
        <Text>{props.data.content.slice(0, 150)}</Text>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Review;
