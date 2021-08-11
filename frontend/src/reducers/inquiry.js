import produceUtil from 'utils/produce.util';

export const initialState = {
  inquiries: [],
  inquirie: null,
  loadInquiriesLoading: false,
  loadInquiriesDone: false,
  loadInquiriesError: null,
  addInquiriesLoading: false,
  addInquiriesDone: false,
  addInquiriesError: null,
};

export const LOAD_INQUIRIES_REQUEST = 'LOAD_INQUIRIES_REQUEST';
export const LOAD_INQUIRIES_SUCCESS = 'LOAD_INQUIRIES_SUCCESS';
export const LOAD_INQUIRIES_FAILURE = 'LOAD_INQUIRIES_FAILURE';

export const ADD_INQUIRIES_REQUEST = 'ADD_INQUiRIES_REQUEST';
export const ADD_INQUIRIES_SUCCESS = 'ADD_INQUiRIES_SUCCESS';
export const ADD_INQUIRIES_FAILURE = 'ADD_INQUiRIES_FAILURE';

const reducer = (state = initialState, action) =>
  produceUtil(state, (draft) => {
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
      case ADD_INQUIRIES_REQUEST:
        draft.addInquiriesLoading = true;
        draft.addInquiriesDone = false;
        draft.addInquiriesError = null;
        break;
      case ADD_INQUIRIES_SUCCESS:
        draft.addInquiriesLoading = false;
        draft.addInquiriesDone = true;
        draft.inquiries = action.data;
        break;
      case ADD_INQUIRIES_FAILURE:
        draft.addInquiriesLoading = false;
        draft.addInquiriesError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
