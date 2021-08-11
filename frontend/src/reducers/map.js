import produceUtil from 'utils/produce.util';

export const initialState = {
  map: null,
  loading: true,
  oldMarker: [],
  oldOverlay: [],
};

export const SET_MAP = 'SET_MAP';
export const ADD_MARKER = 'ADD_MARKER';
export const SET_GEO_REQUEST = 'SET_GEO_REQUEST';
export const SET_GEO_SUCCESS = 'SET_GEO_SUCCESS';
export const SET_GEO_FAILURE = 'SET_GEO_FAILURE';

const reducer = (state = initialState, action) =>
  produceUtil(state, (draft) => {
    switch (action.type) {
      case SET_MAP:
        draft.map = action.map;
        break;
      case ADD_MARKER:
        draft.oldMarker = action.marker;
        draft.oldOverlay = action.overlay;
        break;
      case SET_GEO_REQUEST:
        draft.loading = true;
        break;
      case SET_GEO_SUCCESS:
        draft.loading = false;
        break;
      case SET_GEO_FAILURE:
        draft.loading = true;
        break;
      default:
        break;
    }
  });

export default reducer;
