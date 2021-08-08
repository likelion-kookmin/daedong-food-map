import React, { useEffect } from 'react';
import { LOAD_BOOKMARKS_REQUEST } from 'reducers/bookmark';

import { useDispatch, useSelector } from 'react-redux';
import { Divider, Segment, Dimmer, Loader } from 'semantic-ui-react';

import BookmarkCard from 'components/Bookmark/bookmarkCard';

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
      <h1>북마크 목록</h1>
      <Divider />
      {loadBookmarksLoading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader size="huge">Loading</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <Segment.Group>
          {bookmarks.map((bookmark) => (
            <BookmarkCard bookmark={bookmark} />
          ))}
        </Segment.Group>
      )}
    </div>
  );
};

export default BookmarkListPage;
