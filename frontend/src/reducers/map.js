import produceUtil from 'utils/produce.util';

export const initialState = {
  map: null,
  oldMarker: [],
  oldOverlay: [],
};

export const SET_MAP = 'SET_MAP';
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
      default:
        break;
    }
  });

export default reducer;
