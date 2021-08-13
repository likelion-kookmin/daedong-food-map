import React from 'react';
import styled from 'styled-components';
import { Grid, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';
import useWindowDimensions from 'utils/window.util';
import { apiUrl } from 'config/api.config';

const Section = styled.div`
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
`;

const InfoSection = styled(Section)`
  align-items: center;
  @media only screen and (max-width: 530px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 0;
  }

  margin-bottom: 1.5rem;
`;

const Text = styled.div`
  font-family: 'NS-R';
  font-size: 1.4rem;
  color: #707070;

  @media only screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const ScoreText = styled(Text)`
  margin: 0 0 0 0.5rem;
`;

const Review = (props) => {
  const { width } = useWindowDimensions();
  const date = moment(props.data.updatedAt).format('YYYY.MM.DD');

  return (
    <Grid.Row padded="vertically">
      <Grid.Column textAlign="center" width={5}>
        <Image
          circular
          size={props.size ? props.size : 'small'}
          src={
            props.data.user.avatar
              ? apiUrl + props.data.user.avatar
              : 'https://react.semantic-ui.com/images/wireframe/square-image.png'
          }
          style={{ display: 'inline-block', marginBottom: '1rem' }}
        />
        <Text style={props.size ? { fontSize: '1.2rem' } : null}>
          {props.data.user.email.split('@')[0]}
        </Text>
      </Grid.Column>
      <Grid.Column width={11}>
        <InfoSection>
          <Section style={{ alignItems: 'center' }}>
            {[...Array(props.data.score)].map((n) => {
              return width > 376 ? (
                <Icon
                  name="star"
                  size={props.size ? null : 'large'}
                  style={{ color: '#F25C69', margin: '0 0.3rem 0.2rem 0' }}
                />
              ) : (
                <Icon name="star" style={{ color: '#F25C69', margin: '0 0.3rem 0.2rem 0' }} />
              );
            })}
            {[...Array(5 - props.data.score)].map((n) => {
              return width > 376 ? (
                <Icon
                  name="star outline"
                  size={props.size ? null : 'large'}
                  style={{ color: '#F25C69', margin: '0 0.3rem 0.2rem 0' }}
                />
              ) : (
                <Icon
                  name="star outline"
                  style={{ color: '#F25C69', margin: '0 0.3rem 0.2rem 0' }}
                />
              );
            })}
            <ScoreText style={props.size ? { fontSize: '1.2rem' } : null}>
              {props.data.score}점
            </ScoreText>
          </Section>

          <Section style={{ alignItems: 'center' }}>
            <Text style={props.size ? { fontSize: '1.2rem' } : null}>{date}</Text>
          </Section>
          <div style={{ flexGrow: 2 }} />
        </InfoSection>
        <Text
          style={
            props.size ? { wordWrap: 'break-word', fontSize: '1.2rem' } : { wordWrap: 'break-word' }
          }
        >
          {props.data.content}
        </Text>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Review;
