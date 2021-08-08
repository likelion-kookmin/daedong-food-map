import React, { Fragment } from 'react';
import Map from 'components/Map/map.js';
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
