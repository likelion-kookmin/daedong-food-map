import React, { Fragment, useEffect } from 'react';
import Map from 'components/Map/KakaoMap.js';
import PlaceList from 'components/Place/PlaceList';
import { SET_GEO_REQUEST } from 'reducers/map';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const { map } = useSelector((state) => state.map);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_GEO_REQUEST,
      map: map,
    });
  }, [map]);

  return (
    <Fragment>
      <Map />
      <PlaceList />
    </Fragment>
  );
};

export default Home;
