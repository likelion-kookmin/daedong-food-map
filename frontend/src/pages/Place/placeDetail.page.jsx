import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PLACE_REQUEST } from 'reducers/place';
import { Icon, Label } from 'semantic-ui-react';
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

const Text = styled.div`
  font-family: 'NS-R';
  font-size: 1rem;
  color: #707070;
`;

const Tag = styled(Label)`
  font-family: 'NS-R';
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding-right: 0.3rem;
  border-radius: 0;
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

  const imglist =
    singlePlace?.images && singlePlace?.images.length
      ? singlePlace.images.map((img, index) => (
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
    <div className={loadPlaceLoading ? 'loading' : ''}>
      <section style={{ alignItems: 'baseline' }}>
        <h3>{singlePlace?.name}</h3>
        <Icon name="star" style={{ color: '#F25C69', marginLeft: '0.8rem' }} />
        <Text>{singlePlace?.averageScore}</Text>
        <Text>리뷰 {singlePlace?.reviewCount}개</Text>
      </section>
      <section style={{ justifyContent: 'space-between' }}>
        <section style={{ margin: '0' }}>
          {singlePlace?.tags.map((tag) => {
            return <Tag>{tag}</Tag>;
          })}
        </section>
        <Text style={{ paddingTop: '0.5rem' }}>{singlePlace?.distance}</Text>
      </section>
      <section style={{ justifyContent: 'space-between' }}>{imglist}</section>
    </div>
  );
};

export default PlaceDetailPage;
