import React from 'react';
import { Icon, Label, Card, Item, Segment, Grid, Button } from 'semantic-ui-react';
import styled from 'styled-components';
const ImgContainer = styled(Grid.Column)`
  padding-right: 0 !important;

  &: last-child {
    img {
      border-radius: 0 10px 10px 0;
    }
  }
  &: first-child {
    img {
      border-radius: 10px 0 0 10px;
    }
  }
  &: only-child {
    img {
      border-radius: 10px;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ReportCard = (props) => {
  const { title, content, place } = props?.report;

  const imglist = place.images.map((img, index) => (
    <ImgContainer mobile={3} tablet={2} width={1}>
      <Img src={img.image} />
    </ImgContainer>
  ));
  return (
    <Segment padded>
      <Grid>
        <Grid.Row columns={16}>
          <Grid.Column width={10}>
            <h3>
              {place.name}
              <br />
              <span style={{ fontSize: 'small', color: 'gray' }}> ({place.address}) </span>
            </h3>
          </Grid.Column>
          <Grid.Column width={6} textAlign="right">
            <Button.Group basic size="small">
              <Button icon>
                <Icon name="edit outline" />
              </Button>
              <Button icon>
                <Icon name="delete" />
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <p> {content} </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>{imglist}</Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <section style={{ margin: '0' }}>
              {place.tags.map((tag) => {
                return <Label>{tag}</Label>;
              })}
            </section>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default ReportCard;
