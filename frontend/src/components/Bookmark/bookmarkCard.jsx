import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DESTROY_BOOKMARK_REQUEST, ADD_BOOKMARK_REQUEST } from 'reducers/bookmark';

import { Icon, Label, Grid } from 'semantic-ui-react';

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

function BookmarkCard(props) {
  const { place } = props?.bookmark;

  const dispatch = useDispatch();
  const handleBookmark = (is_bookmarked, id) => {
    if (is_bookmarked) {
      dispatch({
        type: DESTROY_BOOKMARK_REQUEST,
        id: place.id,
      });
    } else {
      dispatch({
        type: ADD_BOOKMARK_REQUEST,
        id: place.id,
      });
    }
    window.location.reload();
  };

  const imglist =
    place.images && place.images.length
      ? place.images.slice(0, 3).map((img) => (
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
    <Grid.Column>
      <Container>
        <Section style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Section style={{ margin: 0 }}>
            <Link to={`/places/${[place.id]}`}>
              <Name>{place.name}</Name>
            </Link>
            <Icon name="star" style={{ color: '#F25C69', margin: '0 0.2rem 0 0.8rem' }} />
            <Text>{parseFloat(place.average_score.toFixed(2))}</Text>
            <Reviews>리뷰 {place.review_count}개</Reviews>
          </Section>
          <button
            style={{ background: 'none', border: 'none' }}
            onClick={() => {
              handleBookmark(place.is_bookmarked, place.id);
            }}
          >
            <Section style={{ margin: 0 }}>
              <Icon
                name={place.is_bookmarked ? 'star' : 'star outline'}
                color="yellow"
                size="large"
                style={{ cursor: 'pointer' }}
              />
            </Section>
          </button>
        </Section>
        <Section style={{ justifyContent: 'space-between' }}>
          <Section style={{ margin: '0' }}>
            {place.tags.map((tag) => {
              return <Tag>{tag}</Tag>;
            })}
            <Tag style={{ visibility: 'hidden' }}>빈칸용</Tag>
          </Section>
        </Section>
        <Section style={{ justifyContent: 'space-between' }}>{imglist}</Section>
      </Container>
    </Grid.Column>
  );
}

export default BookmarkCard;
