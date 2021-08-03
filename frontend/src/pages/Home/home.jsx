import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from 'components/LoginForm';
import { LOAD_PLACES_REQUEST } from 'reducers/place';

function Home() {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.place.mainPlaces);
  console.log(places);

  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, []);

  return (
    <Fragment>
      <img src="images/LogoTitle.png" style={{ width: '500px' }} alt="Logo" />
      <p>Hello World!</p>
      <LoginForm />
    </Fragment>
  );
}

export default Home;
