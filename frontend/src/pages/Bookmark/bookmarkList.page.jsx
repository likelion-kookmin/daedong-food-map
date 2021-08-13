import React, { useEffect } from 'react';
import { LOAD_BOOKMARKS_REQUEST } from 'reducers/bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';

import BookmarkCard from 'components/Bookmark/bookmarkCard';

const Section = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
  gap: 0.2rem;
`;

const Name = styled.div`
  font-family: 'NS-EB';
  font-size: 2rem;
  color: #3e3e3e;

  ${media.phone`
    font-size: 1.7rem;
  `};
`;

const BookmarkListPage = () => {
  const dispatch = useDispatch();
  const { bookmarks, loadBookmarksLoading } = useSelector((state) => state.bookmark);

  useEffect(() => {
    dispatch({
      type: LOAD_BOOKMARKS_REQUEST,
    });
  }, [dispatch]);

  return (
    <div>
      <Section style={{ margin: '1.5rem 0 3rem  0' }}>
        <Name>내 북마크</Name>
      </Section>
      {loadBookmarksLoading ? (
        <Dimmer active inverted>
          <Loader size="huge">Loading</Loader>
        </Dimmer>
      ) : (
        <Grid stackable columns={2}>
          {bookmarks.map((bookmark) => (
            <BookmarkCard bookmark={bookmark} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default BookmarkListPage;
