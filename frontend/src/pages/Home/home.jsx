import React, { Fragment, useEffect } from 'react';
import Map from 'components/Map/KakaoMap.js';
import useGeolocation from 'components/Map/useGeolocation';
import PlaceList from 'components/Place/PlaceList';
import { useSelector } from 'react-redux';

const Home = () => {
  const { map } = useSelector((state) => state.map);
  const { getGeo } = useGeolocation();

  useEffect(() => {
    getGeo();
  }, [map]);

  return (
    <Fragment>
      <Map />
      <PlaceList />
    </Fragment>
  );
};

export default Home;
