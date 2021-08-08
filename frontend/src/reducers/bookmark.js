import produceUtil from 'utils/produce.util';

export const initialState = {
  bookmarks: [],
  loadBookmarksLoading: false,
  loadBookmarksDone: false,
  loadBookmarksError: null,
};

export const LOAD_BOOKMARKS_REQUEST = 'LOAD_BOOKMARKS_REQUEST';
export const LOAD_BOOKMARKS_SUCCESS = 'LOAD_BOOKMARKS_SUCCESS';
export const LOAD_BOOKMARKS_FAILURE = 'LOAD_BOOKMARKS_FAILURE';

const reducer = (state = initialState, action) =>
  produceUtil(state, (draft) => {
    switch (action.type) {
      case LOAD_BOOKMARKS_REQUEST:
        draft.loadBookmarksLoading = true;
        draft.loadBookmarksDone = false;
        draft.loadBookmarksError = null;
        break;
      case LOAD_BOOKMARKS_SUCCESS:
        draft.loadBookmarksLoading = false;
        draft.loadBookmarksDone = true;
        draft.bookmarks = action.data;
        break;
      case LOAD_BOOKMARKS_FAILURE:
        draft.loadBookmarksLoading = false;
        draft.loadBookmarksError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
