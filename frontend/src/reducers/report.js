import produce from 'utils/produce.util';

export const initialState = {
  reports: [],
  loadReportsLoading: false,
  loadReportsDone: false,
  loadReportsError: null,
};

export const LOAD_REPORTS_REQUEST = 'LOAD_REPORTS_REQUEST';
export const LOAD_REPORTS_SUCCESS = 'LOAD_REPORTS_SUCCESS';
export const LOAD_REPORTS_FAILURE = 'LOAD_REPORTS_FAILURE';

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_REPORTS_REQUEST:
        draft.loadReportsLoading = true;
        draft.loadReportsDone = false;
        draft.loadReportsError = null;
        break;
      case LOAD_REPORTS_SUCCESS:
        draft.loadReportsLoading = false;
        draft.loadReportsDone = true;
        draft.reports = action.data;
        break;
      case LOAD_REPORTS_FAILURE:
        draft.loadReportsLoading = false;
        draft.loadReportsError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
