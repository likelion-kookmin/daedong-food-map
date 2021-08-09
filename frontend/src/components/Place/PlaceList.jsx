import React, { Fragment, useEffect } from 'react';

import PlaceCard from 'components/Place/PlaceCard';
import { Grid } from 'semantic-ui-react';
import { SET_PLACE_LIST } from '../../reducers/map';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';
import Loading from 'components/Loading/loading.js';
import PlacePagination from 'components/Place/Pagination';
import useSetMarker from 'components/Map/useSetMarker';

const PlaceList = () => {
  const dispatch = useDispatch();
  const mainPlaces = useSelector((state) => state.place.mainPlaces);
  const { loadPlacesLoading, currentPage, totalPages } = useSelector((state) => state.place);
  const { setMarker } = useSetMarker();
  useEffect(() => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    setMarker();
  }, [mainPlaces]);

  return (
    <Fragment>
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
      <PlacePagination currentPage={currentPage} totalPages={totalPages} />
    </Fragment>
  );
};

export default PlaceList;
