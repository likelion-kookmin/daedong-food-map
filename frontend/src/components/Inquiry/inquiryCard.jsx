import React from 'react';
import { Link } from 'react-router-dom';
import { Label, Grid, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';
import moment from 'moment';

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

const Category = styled(Name)`
  font-family: 'NS-B';
  font-size: 1.3rem;
  margin: 0;
  color: #3e3e3e;

  ${media.phone`
    font-size: 1.5rem;
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

const InquiryCard = (props) => {
  const { category, content, created_at, place } = props?.inquiry;

  return (
    <Grid.Column>
      <Container>
        <Section style={{ marginBottom: '0.5rem' }}>
          <Link to={`/places/${[place.id]}`}>
            <Name>{place.name}</Name>
          </Link>
          {place.tags.map((tag) => {
            return <Tag>{tag}</Tag>;
          })}
        </Section>
        <Section style={{ marginBottom: '1rem' }}>
          <Text>{place.address}</Text>
        </Section>
        <Divider />
        <Section style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Section style={{ alignItems: 'baseline' }}>
            <Category>{category}</Category>
            <Text>에 문제가 있어요.</Text>
          </Section>
          <Text>{moment(created_at).format('YYYY.MM.DD')}</Text>
        </Section>
        <Section style={{ margin: '1rem 0' }}>
          {content ? <Text>{content}</Text> : <Text style={{ visibility: 'hidden' }}>빈칸</Text>}
        </Section>
      </Container>
    </Grid.Column>
  );
};

export default InquiryCard;
