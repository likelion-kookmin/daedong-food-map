import React, { useEffect } from 'react';
import { Label, Grid, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';
import moment from 'moment';
import { lighten } from 'polished';

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 1.5rem;
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
  color: #3e3e3e;
  margin-right: 1rem;

  ${media.phone`
    font-size: 1.7rem;
  `};
`;

const Category = styled(Name)`
  font-family: 'NS-B';
  font-size: 1.3rem;
  margin: 0;

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

const ImgContainer = styled.div`
  position: relative;
  flex-grow: 1;
  padding-bottom: 25%;
  &:last-child {
    img {
      border-radius: 0 10px 10px 0;
    }
  }
  &:first-child {
    img {
      border-radius: 10px 0 0 10px;
    }
  }
  &:only-child {
    img {
      border-radius: 10px;
    }
  }
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding-right: 0.3rem;
  border-radius: 0;
`;

const Btn = styled.button`
  font-family: 'NS-B';
  padding: 0.6435rem 1rem;
  text-decoration: none;
  transition: 0.1s all;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const InquiryCard = (props) => {
  const { category, content, created_at, place } = props?.inquiry;

  return (
    <Grid.Column>
      <Container>
        <Section style={{ marginBottom: '0.5rem' }}>
          <Name>{place.name}</Name>
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
          <Text>{moment(place.created_at).format('YYYY.MM.DD')}</Text>
        </Section>
        <Section style={{ margin: '1rem 0' }}>
          {content ? <Text>{content}</Text> : <Text style={{ visibility: 'hidden' }}>빈칸</Text>}
        </Section>
      </Container>
    </Grid.Column>
  );
};

export default InquiryCard;
