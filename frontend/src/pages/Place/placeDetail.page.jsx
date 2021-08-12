import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PLACE_REQUEST } from 'reducers/place';
import { ADD_REVIEW_REQUEST } from 'reducers/review';
import { DESTROY_BOOKMARK_REQUEST, ADD_BOOKMARK_REQUEST } from 'reducers/bookmark';
import styled from 'styled-components';
import { Icon, Form, TextArea, Label, Rating, Grid } from 'semantic-ui-react';
import { lighten } from 'polished';
import { media } from 'utils/style.util';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import NextArrow from 'components/common/NextArrow';
import PrevArrow from 'components/common/PrevArrow';
import Review from 'components/Review/Review';
import NewInquiryModal from 'components/Inquiry/NewInquiryModal';

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

  ${media.phone`
    font-size: 1.7rem;
  `};
`;

const Tag = styled(Label)`
  font-family: 'NS-R';
`;

const Text = styled.div`
  font-family: 'NS-R';
  font-size: 1rem;
  color: #707070;
`;

const Carousel = styled(Slider)`
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
  position: relative;
  flex-grow: 1;
  width: 20%;
  padding-bottom: 15%;

  ${media.tablet`
    width: 30%;
    padding-bottom: 25%;
  `};

  ${media.phone`
    width: 40%;
    padding-bottom: 35%;
  `};
`;

const PlaceImg = styled.img`
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

const PrimaryBtn = styled(Btn)`
  color: #ffffff;
  background-color: #f25c69;
  &:hover {
    background: ${lighten(0.1, '#F25C69')};
  }
`;

const LinkedText = styled(Text)`
  cursor: pointer;

  &:hover {
    color: #0475f4;
    text-decoration: underline;
  }
`;

const PlaceDetailPage = () => {
  const { id } = useParams();
  const { singlePlace, loadPlaceLoading } = useSelector((state) => state.place);
  const { addReviewDone, addReviewError } = useSelector((state) => state.review);
  const [imgs, setImgs] = useState([]);
  const inputFile = useRef(null);
  const [contents, setContents] = useState('');
  const [contentsError, setContentsError] = useState('');
  const [rating, setRating] = useState(1);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

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

  // 리뷰 사진 기능
  // const handleInputFile = (e) => {
  //   e.preventDefault();
  //   inputFile.current.click();
  // };

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

  const handleContents = (e) => {
    setContents(e.target.value);
    if (e.target.value.length >= 100) {
      setContents(e.target.value.slice(0, 100));
    }
  };

  const handleBookmark = (isBookmarked, id) => {
    if (isBookmarked) {
      dispatch({
        type: DESTROY_BOOKMARK_REQUEST,
        id: id,
      });
    } else {
      dispatch({
        type: ADD_BOOKMARK_REQUEST,
        id: id,
      });
    }
    dispatch({
      type: LOAD_PLACE_REQUEST,
      id: id,
    });
  };

  const openInquiryModal = () => {
    setInquiryModalOpen(true);
  };

  return (
    <div className={loadPlaceLoading ? 'loading' : ''}>
      <Section
        style={{ margin: '1.5rem 0 0 0', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Section>
          <Name>{singlePlace?.name}</Name>
          <Icon
            name="star"
            size="large"
            style={{ color: '#F25C69', margin: '0 0.4rem 0 0.8rem' }}
          />
          <Text style={{ fontSize: '1.5rem' }}>
            {parseFloat(singlePlace?.averageScore.toFixed(2))}
          </Text>
        </Section>
        <button
          style={{ background: 'none', border: 'none' }}
          onClick={() => {
            handleBookmark(singlePlace?.isBookmarked, singlePlace.id);
          }}
        >
          <Section>
            <Icon
              name={singlePlace?.isBookmarked ? 'star' : 'star outline'}
              color="yellow"
              size="big"
              style={{ marginRight: '1rem' }}
            />
          </Section>
        </button>
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
      <Section style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        {singlePlace?.tags.map((tag) => {
          return <Tag>{tag}</Tag>;
        })}
        <LinkedText onClick={openInquiryModal}>정보에 문제가 있어요</LinkedText>
      </Section>
      <Section>
        <Text style={{ fontSize: '1.2rem', marginBottom: '5rem' }}>
          {singlePlace?.address + ' ' + singlePlace?.detailAddress}
        </Text>
        <NewInquiryModal id={id} setOpen={setInquiryModalOpen} open={inquiryModalOpen} />
      </Section>
      {singlePlace?.images.length > 3 ? (
        <Section
          style={{
            justifyContent: 'center',
            paddingBottom: '2rem',
          }}
        >
          <Carousel {...settings}>
            {singlePlace?.images.map((img) => (
              <CarouselContainer>
                <Img src={img.image} />
              </CarouselContainer>
            ))}
          </Carousel>
        </Section>
      ) : (
        singlePlace?.images.map((img) => (
          <PlaceImgContainer>
            <PlaceImg src={img.image} />
          </PlaceImgContainer>
        ))
      )}

      <Form onSubmit={handleSubmit}>
        <Section style={{ marginTop: '5rem', alignItems: 'center' }}>
          <Name style={{ fontSize: '1.8rem' }}>리뷰 작성하기</Name>
          {/* <label htmlFor="file">
            <Button
              basic
              type="button"
              icon="camera"
              content="사진첨부"
              color="blue"
              onClick={handleInputFile}
              style={{ marginLeft: '1rem', fontFamily: 'NS-R' }}
            />
          </label> */}
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
        <Section style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Section style={{ margin: 0 }}>
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
          <Text>{contents.length} / 100</Text>
        </Section>
        <Form.Field
          fluid
          placeholder="리뷰를 작성해주세요."
          control={TextArea}
          value={contents}
          onChange={handleContents}
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
