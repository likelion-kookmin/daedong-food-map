import React, { useEffect } from 'react';
import { Label, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';
import moment from 'moment';
import { lighten } from 'polished';

import { useDispatch, useSelector } from 'react-redux';
import { DESTROY_REPORT_REQUEST } from 'reducers/report';

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

const PrimaryBtn = styled(Btn)`
  color: #ffffff;
  background-color: #f25c69;
  &:hover {
    background: ${lighten(0.1, '#F25C69')};
  }
`;

// const SecondaryBtn = styled(Btn)`
//   color: #3e3e3e;
//   background-color: #f2f2f2;
//   margin-right: 0.5rem;
//   &:hover {
//     background: ${darken(0.1, '#F2F2F2')};
//   }
// `;

const ReportCard = (props) => {
  const { content, place } = props?.report;
  const { destroyReportDone } = useSelector((state) => state.report);
  const dispatch = useDispatch();

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

  const handleDelete = () => {
    dispatch({
      type: DESTROY_REPORT_REQUEST,
      id: props.report?.id,
    });
  };

  useEffect(() => {
    if (destroyReportDone) {
      window.location.reload();
    }
  });

  return (
    <Grid.Column>
      <Container>
        <Section style={{ marginBottom: '1rem' }}>
          <Name>{place.name}</Name>
          {place.tags.map((tag) => {
            return <Tag>{tag}</Tag>;
          })}
        </Section>
        <Section>
          <Text>{place.address}</Text>
        </Section>
        <Section style={{ marginBottom: '1rem' }}>
          {content ? <Text>{content}</Text> : <Text style={{ visibility: 'hidden' }}>빈칸</Text>}
        </Section>
        <Section style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          {imglist}
        </Section>
        <Section style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          {/* 수정 만들면 버튼 열기... */}
          <Text>{moment(place.created_at).format('YYYY.MM.DD')}</Text>
          {place.status === 'p' ? (
            <div style={{ visibility: 'hidden' }}>
              {/* <SecondaryBtn>수정</SecondaryBtn>/ */}
              <PrimaryBtn>삭제</PrimaryBtn>
            </div>
          ) : (
            <div>
              {/* <SecondaryBtn>수정</SecondaryBtn> */}
              <PrimaryBtn onClick={handleDelete}>삭제</PrimaryBtn>
            </div>
          )}
        </Section>
      </Container>
    </Grid.Column>
  );
};

export default ReportCard;
