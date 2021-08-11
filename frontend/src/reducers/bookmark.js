import produceUtil from 'utils/produce.util';

export const initialState = {
  bookmarks: [],
  bookmark: null,
  loadBookmarksLoading: false,
  loadBookmarksDone: false,
  loadBookmarksError: null,
  addBookmarkLoading: false,
  addBookmarkDone: false,
  addBookmarkError: null,
  destroyBookmarkLoading: false,
  destroyBookmarkDone: false,
  destroyBookmarkError: null,
};

export const LOAD_BOOKMARKS_REQUEST = 'LOAD_BOOKMARKS_REQUEST';
export const LOAD_BOOKMARKS_SUCCESS = 'LOAD_BOOKMARKS_SUCCESS';
export const LOAD_BOOKMARKS_FAILURE = 'LOAD_BOOKMARKS_FAILURE';

export const ADD_BOOKMARK_REQUEST = 'ADD_BOOKMARK_REQUEST';
export const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS';
export const ADD_BOOKMARK_FAILURE = 'ADD_BOOKMARK_FAILURE';

export const DESTROY_BOOKMARK_REQUEST = 'DESTROY_BOOKMARK_REQUEST';
export const DESTROY_BOOKMARK_SUCCESS = 'DESTROY_BOOKMARK_SUCCESS';
export const DESTROY_BOOKMARK_FAILURE = 'DESTROY_BOOKMARK_FAILURE';

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
      case ADD_BOOKMARK_REQUEST:
        draft.addBookmarkLoading = true;
        draft.addBookmarkDone = false;
        draft.addBookmarkError = null;
        break;
      case ADD_BOOKMARK_SUCCESS:
        draft.addBookmarkLoading = false;
        draft.addBookmarkDone = true;
        draft.bookmark = action.data;
        break;
      case ADD_BOOKMARK_FAILURE:
        draft.addBookmarkLoading = false;
        draft.addBookmarkError = action.error;
        break;
      case DESTROY_BOOKMARK_REQUEST:
        draft.destroyBookmarkLoading = true;
        draft.destroyBookmarkDone = false;
        draft.destroyBookmarkError = null;
        break;
      case DESTROY_BOOKMARK_SUCCESS:
        draft.destroyBookmarkLoading = false;
        draft.destroyBookmarkDone = true;
        break;
      case DESTROY_BOOKMARK_FAILURE:
        draft.destroyBookmarkLoading = false;
        draft.destroyBookmarkError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
