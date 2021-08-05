import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PLACES_REQUEST, LOAD_PLACE_REQUEST } from 'reducers/place';

function Home() {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.place.mainPlaces);
  console.log(places);

  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: LOAD_PLACE_REQUEST,
      id: 1,
    });
  }, [dispatch]);

  return <Fragment>메인화면</Fragment>;
}

export default Home;
