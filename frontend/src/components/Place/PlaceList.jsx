import React, { Fragment, useEffect } from 'react';

import PlaceCard from 'components/Place/PlaceCard';
import { Grid } from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';
import PlacePagination from 'components/Place/Pagination';

const PlaceList = () => {
  const dispatch = useDispatch();
  const mainPlaces = useSelector((state) => state.place.mainPlaces);
  const { currentPage, totalPages } = useSelector((state) => state.place);
  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, [dispatch]);

  return (
    <Fragment>
      <Grid stackable columns={2} paded="true">
        {mainPlaces.map((place) => (
          <Grid.Column>
            <PlaceCard data={place} />
          </Grid.Column>
        ))}
      </Grid>
      <PlacePagination currentPage={currentPage} totalPages={totalPages} />
    </Fragment>
  );
};

export default PlaceList;
