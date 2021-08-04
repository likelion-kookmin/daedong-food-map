import produce from 'utils/produce.util';

export const initialState = {
  inquiries: [],
  loadInquiriesLoading: false,
  loadInquiriesDone: false,
  loadInquiriesError: null,
};

export const LOAD_INQUIRIES_REQUEST = 'LOAD_INQUIRIES_REQUEST';
export const LOAD_INQUIRIES_SUCCESS = 'LOAD_INQUIRIES_SUCCESS';
export const LOAD_INQUIRIES_FAILURE = 'LOAD_INQUIRIES_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_INQUIRIES_REQUEST:
        draft.loadInquiriesLoading = true;
        draft.loadInquiriesDone = false;
        draft.loadInquiriesError = null;
        break;
      case LOAD_INQUIRIES_SUCCESS:
        draft.loadInquiriesLoading = false;
        draft.loadInquiriesDone = true;
        draft.inquiries = action.data;
        break;
      case LOAD_INQUIRIES_FAILURE:
        draft.loadInquiriesLoading = false;
        draft.loadInquiriesError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
