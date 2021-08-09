import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';

function Footer() {
  return (
    <Segment inverted vertical style={{ padding: '2rem 0em', minHeight: '10rem' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="소개" />
              <List link inverted>
                <List.Item
                  as="a"
                  href="https://github.com/likelion-kookmin/daedong-food-map/blob/develop/docs/introduce.md"
                  target="_blank"
                  rel="noopener"
                  style={{ color: 'rgba(255,255,255,.9)' }}
                >
                  사이트 소개글
                </List.Item>
                <List.Item as="a">
                  <Link to="/policies">개인정보처리방침</Link>
                </List.Item>
                <List.Item
                  as="a"
                  href="mailto:kmu@likelion.org"
                  style={{ color: 'rgba(255,255,255,.9)' }}
                >
                  kmu@likelion.org
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="서비스" />
              <List link inverted>
                <List.Item as="a">
                  <Link to="/">Home</Link>
                </List.Item>
                <List.Item
                  as="a"
                  href="https://github.com/likelion-kookmin/daedong-food-map"
                  target="_blank"
                  rel="noopener"
                  style={{ color: 'rgba(255,255,255,.9)' }}
                >
                  Github
                </List.Item>
                <List.Item
                  as="a"
                  href="https://daedong-food-map-api.herokuapp.com/swagger/"
                  target="_blank"
                  rel="noopener"
                  style={{ color: 'rgba(255,255,255,.9)' }}
                >
                  API docs
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Daedong Food Map
              </Header>
              <p>대동멋지도에 여러분들만 알고 있는 먹거리를 소개해주세요.</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}

export default Footer;
