import React from 'react';
import { Pagination, Container } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';

const PlacePagination = ({ currentPage, totalPages }) => {
  const dispatch = useDispatch();
  const handlePaginationChange = (e, { activePage }) => {
    dispatch({
      type: LOAD_PLACES_REQUEST,
      data: {
        page: activePage,
      },
    });
  };
  return (
    <Container textAlign="center" style={{ padding: '1rem' }}>
      <Pagination
        activePage={currentPage}
        onPageChange={handlePaginationChange}
        size="mini"
        siblingRange={2}
        totalPages={totalPages}
        secondary
      />
    </Container>
  );
};

export default PlacePagination;
