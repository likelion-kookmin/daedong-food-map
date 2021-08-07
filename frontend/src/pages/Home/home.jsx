import React, { Fragment } from 'react';
import Map from 'components/Map/KakaoMap.js';
import PlaceList from 'components/Place/PlaceList';

const Home = () => {
  return (
    <Fragment>
      <Map />
      <PlaceList />
    </Fragment>
  );
};

export default Home;
