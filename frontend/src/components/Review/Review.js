import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const Section = styled.div`
  display: flex;
  align-items: flex-start;
  flex-grow: 1;
  gap: 0.2rem;
`;

const ColumnSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  flex-grow: 1;
  margin-bottom: 1rem;
  gap: 0.2rem;
`;
const ProfileContainer = styled.div`
  position: relative;
  flex-grow: 0;
  width: 30%;
  padding-bottom: 30%;
  margin-bottom: 1rem;
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const Text = styled.div`
  font-family: 'NS-R';
  font-size: 1.5rem;
  color: #707070;
`;

const Review = (props) => {
  return (
    <Section
      style={{
        borderBottom: '1px solid #d6d6d6',
        padding: '2rem 0',
        justifyContent: 'space-between',
      }}
    >
      <ColumnSection>
        <ProfileContainer>
          <Img src={props.data.userProfile} />
        </ProfileContainer>
        <Text>{props.data.userNickname}</Text>
      </ColumnSection>
      <ColumnSection style={{ alignItems: 'flex-start' }}>
        <Section style={{ alignItems: 'baseline', marginBottom: '2rem' }}>
          {[...Array(props.data.score)].map((n) => {
            return (
              <Icon name="star" size="large" style={{ color: '#F25C69', marginRight: '0.3rem' }} />
            );
          })}
          <Text style={{ marginRight: '3rem' }}>{props.data.score}</Text>
          <Text>{props.data.createAt}</Text>
        </Section>
        <Text>{props.data.content}</Text>
      </ColumnSection>
    </Section>
  );
};

export default Review;
