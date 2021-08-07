import React, { useEffect } from 'react';

import PlaceCard from 'components/Place/PlaceCard';
import { Grid } from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';
import Loading from 'components/Loading/loading.js';

const PlaceList = () => {
  const dispatch = useDispatch();
  const mainPlaces = useSelector((state) => state.place.mainPlaces);
  const { loadPlacesLoading } = useSelector((state) => state.place);
  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, [dispatch]);

  return (
    <Grid stackable columns={2} paded="true">
      {loadPlacesLoading ? (
        <Loading />
      ) : (
        mainPlaces.map((place) => (
          <Grid.Column>
            <PlaceCard data={place} />
          </Grid.Column>
        ))
      )}
    </Grid>
  );
};

export default PlaceList;
