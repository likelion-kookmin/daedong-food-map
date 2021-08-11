import React, { Fragment, useEffect } from 'react';
import Map from 'components/Map/KakaoMap.js';
import useGeolocation from 'components/Map/useGeolocation';
import PlaceList from 'components/Place/PlaceList';
import { useSelector } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';

const Home = () => {
  const { map, loading } = useSelector((state) => state.map);
  const { getGeo } = useGeolocation();

  useEffect(() => {
    getGeo();
  }, [getGeo]);

  useEffect(() => {
    if (loading) document.querySelector('.ui.placeholder').style.display = 'none';
  }, [loading, map]);

  return (
    <Fragment>
      <Map />
      <PlaceList />
    </Fragment>
  );
};

export default Home;
