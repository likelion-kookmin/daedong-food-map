import produce from 'utils/produce.util';

export const initialState = {
  review: null,
  loadReviewsLoading: false,
  loadReviewsDone: false,
  loadReviewsError: null,
  addReviewLoading: false,
  addReviewDone: false,
  addReviewError: null,
  updateReviewLoading: false,
  updateReviewDone: false,
  updateReviewError: null,
  destroyReviewLoading: false,
  destroyReviewDone: false,
  destroyReviewError: null,
};

export const ADD_REVIEW_REQUEST = 'ADD_REVIEW_REQUEST';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const ADD_REVIEW_FAILURE = 'ADD_REVIEW_FAILURE';

export const UPDATE_REVIEW_REQUEST = 'UPDATE_REVIEW_REQUEST';
export const UPDATE_REVIEW_SUCCESS = 'UPDATE_REVIEW_SUCCESS';
export const UPDATE_REVIEW_FAILURE = 'UPDATE_REVIEW_FAILURE';

export const DESTROY_REVIEW_REQUEST = 'DESTROY_REVIEW_REQUEST';
export const DESTROY_REVIEW_SUCCESS = 'DESTROY_REVIEW_SUCCESS';
export const DESTROY_REVIEW_FAILURE = 'DESTROY_REVIEW_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_REVIEW_REQUEST:
        draft.addReviewLoading = true;
        draft.addReviewDone = false;
        draft.addReviewError = null;
        break;
      case ADD_REVIEW_SUCCESS:
        draft.addReviewLoading = false;
        draft.addReviewDone = true;
        draft.review = action.data;
        break;
      case ADD_REVIEW_FAILURE:
        draft.addReviewLoading = false;
        draft.addReviewError = action.error;
        break;
      case UPDATE_REVIEW_REQUEST:
        draft.updateReviewLoading = true;
        draft.updateReviewDone = false;
        draft.updateReviewError = null;
        break;
      case UPDATE_REVIEW_SUCCESS:
        draft.updateReviewLoading = false;
        draft.updateReviewDone = true;
        draft.review = action.data;
        break;
      case UPDATE_REVIEW_FAILURE:
        draft.updateReviewLoading = false;
        draft.updateReviewError = action.error;
        break;
      case DESTROY_REVIEW_REQUEST:
        draft.destroyReviewLoading = true;
        draft.destroyReviewDone = false;
        draft.destroyReviewError = null;
        break;
      case DESTROY_REVIEW_SUCCESS:
        draft.destroyReviewLoading = false;
        draft.destroyReviewDone = true;
        break;
      case DESTROY_REVIEW_FAILURE:
        draft.destroyReviewLoading = false;
        draft.destroyReviewError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
