import produce from 'utils/produce.util';

export const initialState = {
  reports: [],
  report: null,
  loadReportsLoading: false,
  loadReportsDone: false,
  loadReportsError: null,
  addReportLoading: false,
  addReportDone: false,
  addReportError: null,
};

export const LOAD_REPORTS_REQUEST = 'LOAD_REPORTS_REQUEST';
export const LOAD_REPORTS_SUCCESS = 'LOAD_REPORTS_SUCCESS';
export const LOAD_REPORTS_FAILURE = 'LOAD_REPORTS_FAILURE';

export const ADD_REPORT_REQUEST = 'ADD_REPORT_REQUEST';
export const ADD_REPORT_SUCCESS = 'ADD_REPORT_SUCCESS';
export const ADD_REPORT_FAILURE = 'ADD_REPORT_FAILURE';

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
      case ADD_REPORT_REQUEST:
        draft.addReportLoading = true;
        draft.addReportDone = false;
        draft.addReportError = null;
        break;
      case ADD_REPORT_SUCCESS:
        draft.addReportLoading = false;
        draft.addReportDone = true;
        draft.report = action.data;
        break;
      case ADD_REPORT_FAILURE:
        draft.addReportLoading = false;
        draft.addReportError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
