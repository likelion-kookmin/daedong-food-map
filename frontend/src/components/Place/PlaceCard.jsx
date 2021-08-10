import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem 1rem 0 1rem;
  position: relative;
  background-color: #ffffff;
  border: 1px solid #a1a1a1;
  border-radius: 10px;
`;

const Section = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 1rem;
`;

const Name = styled.div`
  font-family: 'NS-EB';
  font-size: 1.5rem;
  color: #0c43b6;
`;

const Text = styled.div`
  font-family: 'NS-R';
  font-size: 1rem;
  color: #707070;
`;

const Reviews = styled(Text)`
  margin-left: 1rem;
`;

const Tag = styled(Label)`
  font-family: 'NS-R';
`;

const Number = styled(Label)`
  position: absolute;
  top: 4%;
  right: 2%;
  font-family: 'NS-EB';
`;

const ImgContainer = styled.div`
  position: relative;
  flex-grow: 1;
  padding-bottom: 30%;
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

function PlaceCard(props) {
  const { loadPlacesLoading } = useSelector((state) => state.place);
  const distance = Math.round(props.data.distance || 10);
  const imglist =
    props.data.images && props.data.images.length
      ? props.data.images.slice(0, 3).map((img, index) => (
          <ImgContainer>
            <Img src={img.image} />
          </ImgContainer>
        ))
      : [
          <ImgContainer>
            <Img src="/images/LogoTitle.png" />
          </ImgContainer>,
        ];

  return (
    <Container className={loadPlacesLoading ? 'loading' : ''}>
      <Number circular size="large">
        {props.index}
      </Number>
      <Section style={{ alignItems: 'baseline' }}>
        <Link to={`/places/${[props.data.id]}`}>
          <Name>{props.data.name}</Name>
        </Link>
        <Icon name="star" style={{ color: '#F25C69', margin: '0 0.2rem 0 0.8rem' }} />
        <Text>{4.12}</Text>
        <Reviews>리뷰 {props.data.reviewCount}개</Reviews>
      </Section>
      <Section style={{ justifyContent: 'space-between' }}>
        <Section style={{ margin: '0' }}>
          {props.data.tags.map((tag) => {
            return <Tag>{tag}</Tag>;
          })}
        </Section>
        {/* <Text style={{ paddingTop: '0.5rem' }}>
          {distance > 1000 ? (distance * 0.001).toFixed(2) + 'km' : distance + 'm'}
        </Text> */}
      </Section>
      <Section style={{ justifyContent: 'space-between' }}>{imglist}</Section>
    </Container>
  );
}

export default PlaceCard;
