import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useInput from 'hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PLACE_REQUEST } from 'reducers/place';
import { ADD_REVIEW_REQUEST } from 'reducers/review';
import styled from 'styled-components';
import { Icon, Form, TextArea, Button, Label, Rating, Grid } from 'semantic-ui-react';
import { lighten } from 'polished';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NextArrow from 'components/common/NextArrow';
import PrevArrow from 'components/common/PrevArrow';
import Review from 'components/Review/Review';

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
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  draggable: false,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const CarouselContainer = styled.div`
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

const ImgContainer = styled.div`
  display: inline-block;
  width: 15%;
  position: relative;
  padding-bottom: 15%;
  margin-top: 1rem;
  margin-right: 1rem;
`;

const InputImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const PlaceImgContainer = styled.div`
  display: inline-block;
  width: 15%;
  position: relative;
  padding-bottom: 15%;
`;

const PlaceImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const PrimaryBtn = styled(Btn)`
  color: #ffffff;
  background-color: #f25c69;
  &:hover {
    background: ${lighten(0.1, '#F25C69')};
  }
`;

const PlaceDetailPage = () => {
  const { id } = useParams();
  const { singlePlace, loadPlaceLoading } = useSelector((state) => state.place);
  const { addReviewDone, addReviewError } = useSelector((state) => state.review);
  const [imgs, setImgs] = useState([]);
  const inputFile = useRef(null);
  const [contents, onChangeContents] = useInput('');
  const [contentsError, setContentsError] = useState('');
  const [rating, setRating] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_REQUEST,
      id: id,
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (addReviewError) {
      const { content, nonFieldErrors } = addReviewError;
      if (content) {
        setContentsError(content);
      }
      if (nonFieldErrors) {
        console.log('에러');
      }
    }

    if (addReviewDone) {
      window.location.reload();
    }
  }, [addReviewError, addReviewDone]);

  const handleSubmit = useCallback(() => {
    const images = imgs.map((img) => {
      return { image: img };
    });
    dispatch({
      type: ADD_REVIEW_REQUEST,
      data: {
        place_id: id,
        score: rating,
        content: contents,
        place: id,
        images,
      },
    });
  }, [imgs, dispatch, id, contents, rating]);

  const deleteImg = (e) => {
    const value = e.target.parentElement.id;
    setImgs(imgs.filter((img) => img !== imgs[value]));
  };

  const handleInputFile = (e) => {
    e.preventDefault();
    inputFile.current.click();
  };

  const upload = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgs([...imgs, base64.toString()]);
      }
    };
    const imgTarget = e.target.files;
    if (imgTarget[0]) {
      reader.readAsDataURL(imgTarget[0]);
    }
  };

  const handleRating = (e, { rating }) => {
    setRating(rating);
  };

  return (
    <div className={loadPlaceLoading ? 'loading' : ''}>
      <Section
        style={{ marginTop: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Section>
          <Name>{singlePlace?.name}</Name>
          <Icon
            name="star"
            size="large"
            style={{ color: '#F25C69', margin: '0 0.4rem 0 0.8rem' }}
          />
          <Text style={{ fontSize: '1.5rem' }}>{singlePlace?.averageScore}</Text>
        </Section>
        <Icon name="star outline" color="yellow" size="big" style={{ marginRight: '2rem' }} />
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
          <Text>{singlePlace?.bookmarkCount}</Text>
        </Section>
      </Section>
      <Text style={{ fontSize: '1.2rem' }}>
        {singlePlace?.address + ' ' + singlePlace?.detailAddress}
      </Text>
      <Section
        style={{
          justifyContent: 'center',
          paddingBottom: '2rem',
        }}
      >
        {singlePlace?.images.length > 4 ? (
          <Carousel {...settings}>
            {singlePlace?.images.map((img) => (
              <CarouselContainer>
                <Img src={img.image} />
              </CarouselContainer>
            ))}
          </Carousel>
        ) : (
          // <Grid>
          //   <Grid.Row>
          singlePlace?.images.map((img) => (
            <PlaceImgContainer>
              <PlaceImg src={img.image} />
            </PlaceImgContainer>
          ))
          //   </Grid.Row>
          // </Grid>
        )}
      </Section>

      <Form onSubmit={handleSubmit}>
        <Section style={{ marginTop: '5rem', alignItems: 'center' }}>
          <Name style={{ fontSize: '1.8rem' }}>리뷰 작성하기</Name>
          <label htmlFor="file">
            <Button
              basic
              type="button"
              icon="camera"
              content="사진첨부"
              color="blue"
              onClick={handleInputFile}
              style={{ marginLeft: '1rem', fontFamily: 'NS-R' }}
            />
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            content_type="multipart/form-data"
            ref={inputFile}
            onChange={upload}
            style={{ display: 'none' }}
          />
        </Section>
        <Section style={{ alignItems: 'flex-end' }}>
          <Rating
            icon="star"
            size="large"
            defaultRating={1}
            maxRating={5}
            onRate={handleRating}
            style={{ marginRight: '1rem' }}
          />
          <Text style={{ fontSize: '1.5rem' }}>{rating}</Text>
        </Section>
        <Form.Field
          fluid
          placeholder="리뷰를 작성해주세요."
          control={TextArea}
          value={contents}
          onChange={onChangeContents}
          style={{ fontFamily: 'NS-R' }}
          error={contentsError.length > 0}
        />
        <Section
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '5rem',
          }}
        >
          <div style={{ flexGrow: 1, whiteSpace: 'nowrap', overflow: 'auto', marginTop: '1rem' }}>
            {imgs.map((src, index) => (
              <ImgContainer>
                <Label floating circular id={index} onClick={deleteImg}>
                  <Icon name="delete" style={{ margin: '0', fontSize: '1rem' }} />
                </Label>
                <InputImg src={src} />
              </ImgContainer>
            ))}
          </div>
          <Section>
            <PrimaryBtn type="submit" style={{ marginTop: '1rem', fontFamily: 'NS-R' }}>
              <Icon name="write square" />
              등록
            </PrimaryBtn>
          </Section>
        </Section>
        <Section style={{ marginBottom: '5rem' }}>
          <Text style={{ fontSize: '1.5rem' }}>
            {singlePlace?.reviewCount}개의 리뷰가 있습니다.
          </Text>
        </Section>
        <Grid centered divided="vertically">
          {singlePlace?.reviews.map((review, index) => {
            return <Review data={review} key={index} />;
          })}
        </Grid>
      </Form>
    </div>
  );
};

export default PlaceDetailPage;
