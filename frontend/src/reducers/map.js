import produceUtil from 'utils/produce.util';

export const initialState = {
  map: null,
  loading: false,
  oldMarker: [],
  oldOverlay: [],
};

export const SET_MAP = 'SET_MAP';
export const SET_GEO = 'SET_GEO';
export const ADD_MARKER = 'ADD_MARKER';

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
      case SET_GEO:
        draft.loading = true;
        break;
      default:
        break;
    }
  });

export default reducer;
