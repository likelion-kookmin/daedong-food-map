import React, { Fragment, useEffect } from 'react';

import PlaceCard from 'components/Place/PlaceCard';
import { Grid } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';
import PlacePagination from 'components/Place/Pagination';
import useSetMarker from 'components/Map/useSetMarker';

const PlaceList = () => {
  const dispatch = useDispatch();
  const mainPlaces = useSelector((state) => state.place.mainPlaces);
  const { currentPage, totalPages } = useSelector((state) => state.place);
  const { setMarker } = useSetMarker();
  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setMarker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPlaces]);
  console.log(mainPlaces);
  return (
    <Fragment>
      <Grid stackable columns={2} padded="true">
        {mainPlaces.map((place, index) => (
          <Grid.Column>
            <PlaceCard data={place} index={index + 1} />
          </Grid.Column>
        ))}
      </Grid>
      <PlacePagination currentPage={currentPage} totalPages={totalPages} />
    </Fragment>
  );
};

export default PlaceList;
