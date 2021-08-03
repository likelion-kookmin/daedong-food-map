import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from 'components/LoginForm';
import { LOAD_PLACES_REQUEST, LOAD_PLACE_REQUEST } from 'reducers/place';
import Map from '../../components/Map/map.js';

function Home() {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.place.mainPlaces);
  console.log(places);

  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_REQUEST,
      id: 1,
    });
  });

  return (
    <Fragment>
      <Map />
      <LoginForm />
    </Fragment>
  );
}

export default Home;
