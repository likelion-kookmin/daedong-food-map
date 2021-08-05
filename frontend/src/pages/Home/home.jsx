import React, { Fragment, useEffect } from 'react';
import Map from '../../components/Map/map.js';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';
import Loading from '../../components/Loading/loading.js';

const Home = () => {
  const dispatch = useDispatch();
  const { loadPlacesLoading } = useSelector((state) => state.place);
  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, []);

  return (
    <div>
      {loadPlacesLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <Map />
        </Fragment>
      )}
    </div>
  );
};

export default Home;
