import React, { Fragment, useEffect } from 'react';
<<<<<<< HEAD
import Map from '../../components/Map/map.js';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';
import Loading from '../../components/Loading/loading.js';
=======
import Map from 'components/Map/map.js';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';
import Search from 'components/Search/search.js';
import Loading from 'components/Loading/loading.js';
>>>>>>> 1384b9d43c116099668784686da868885914369e
import PlaceCard from 'components/Home/PlaceCard';
import { Grid } from 'semantic-ui-react';

const Home = () => {
  const dispatch = useDispatch();
  const { loadPlacesLoading } = useSelector((state) => state.place);
  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, [dispatch]);

  const testprops = {
    id: 1,
    name: '황금붕어빵',
    score: '4.12',
    reviews: '57',
    tags: ['붕어빵', '국화빵', '호떡'],
    distance: '1.24km',
    pics: [
      'https://newsimg.hankookilbo.com/cms/articlerelease/2020/12/22/d5b17b0b-690b-4b02-990f-2e0ad40d70da.jpg',
      'https://i.ytimg.com/vi/khp4qDp3qB8/maxresdefault.jpg',
      'https://hng.yna.co.kr/media/content/5694/1574845281067804.jpeg',
    ],
  };

  return (
    <Fragment>
      {loadPlacesLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <Map />
        </Fragment>
      )}
      <Grid stackable columns={2} paded>
        <Grid.Column>
          <PlaceCard data={testprops} />
        </Grid.Column>
        <Grid.Column>
          <PlaceCard data={testprops} />
        </Grid.Column>
        <Grid.Column>
          <PlaceCard data={testprops} />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default Home;
