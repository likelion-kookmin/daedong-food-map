import React from 'react';
import styled from 'styled-components';
import { Icon, Label } from 'semantic-ui-react';

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
  font-family: 'NS-B';
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
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding-right: 0.3rem;
`;

function PlaceCard(props) {
  const imglist = props.data.pics.map((img, index) => (
    <ImgContainer>
      {index === 0 ? (
        <Img src={img} style={{ borderRadius: '10px 0 0 10px' }} />
      ) : index === props.data.pics.length - 1 ? (
        <Img src={img} style={{ borderRadius: '0 10px 10px 0', padding: '0' }} />
      ) : (
        <Img src={img} />
      )}
    </ImgContainer>
  ));

  return (
    <Container>
      <Number circular size="large">
        {props.data.id}
      </Number>
      <Section style={{ alignItems: 'baseline' }}>
        <Name>{props.data.name}</Name>
        <Icon name="star" style={{ color: '#F25C69', marginLeft: '0.8rem' }} />
        <Text>{props.data.score}</Text>
        <Reviews>리뷰 {props.data.reviews}개</Reviews>
      </Section>
      <Section style={{ justifyContent: 'space-between' }}>
        <Section style={{ margin: '0' }}>
          {props.data.tags.map((tag) => {
            return <Tag>{tag}</Tag>;
          })}
        </Section>
        <Text style={{ paddingTop: '0.5rem' }}>1.57km</Text>
      </Section>
      <Section style={{ justifyContent: 'space-between' }}>{imglist}</Section>
    </Container>
  );
}

export default PlaceCard;
