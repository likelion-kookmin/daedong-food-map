import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PLACE_REQUEST } from 'reducers/place';
import { Icon } from 'semantic-ui-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; //Slick의 CSS
import 'slick-carousel/slick/slick-theme.css'; //Slick의 CSS

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

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
`;

const Text = styled.div`
  font-family: 'NS-R';
  font-size: 1rem;
  color: #707070;
`;

const Carousel = styled(Slider)`
  margin-top: 5rem;
  width: 90%;
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  draggable: false,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const ImgContainer = styled.div`
  position: relative;
  padding-bottom: 60%;
  width: 90%;
  outline: none;
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  object-fit: cover;
`;

const PlaceDetailPage = () => {
  const { id } = useParams();
  const { singlePlace, loadPlaceLoading } = useSelector((state) => state.place);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_REQUEST,
      id: id,
    });
  }, [dispatch, id]);

  return (
    <div className={loadPlaceLoading ? 'loading' : ''}>
      <Section style={{ marginTop: '2rem' }}>
        <Name>{singlePlace?.name}</Name>
        <Icon name="star" size="large" style={{ color: '#F25C69', margin: '0 0.4rem 0 0.8rem' }} />
        <Text style={{ fontSize: '1.5rem' }}>{singlePlace?.averageScore}</Text>
      </Section>
      <Section style={{ opacity: '0.8', gap: '2rem', borderBottom: '1px solid #d6d6d6' }}>
        <Section>
          <Icon name="eye" style={{ color: '#707070' }} />
          <Text> {singlePlace?.viewCount} </Text>
        </Section>
        <Section>
          <Icon name="pencil" style={{ color: '#707070' }} />
          <Text>{singlePlace?.reviewCount}</Text>
        </Section>
        <Section>
          <Icon name="star" style={{ color: '#707070', marginRight: '0.2rem' }} />
          <Text>0</Text>
        </Section>
      </Section>
      <Text style={{ fontSize: '1.2rem' }}>
        {singlePlace?.address + ' ' + singlePlace?.detailAddress}
      </Text>
      <Section style={{ justifyContent: 'center' }}>
        <Carousel {...settings}>
          {singlePlace?.images.map((img) => (
            <ImgContainer>
              <Img src={img.image} />
            </ImgContainer>
          ))}
          {singlePlace?.images.map((img) => (
            <ImgContainer>
              <Img src={img.image} />
            </ImgContainer>
          ))}
        </Carousel>
      </Section>
    </div>
  );
};

export default PlaceDetailPage;
