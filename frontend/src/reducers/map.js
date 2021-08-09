import produceUtil from 'utils/produce.util';

export const initialState = {
  map: null,
  placeList: [],
  oldMarker: [],
  oldOverlay: [],
};

export const SET_MAP = 'SET_MAP';
export const SET_PLACE_LIST = 'SET_PLACE_LIST';
export const ADD_MARKER = 'ADD_MARKER';

const reducer = (state = initialState, action) =>
  produceUtil(state, (draft) => {
    switch (action.type) {
      case SET_MAP:
        draft.map = action.map;
        break;
      case SET_PLACE_LIST:
        draft.placeList = action.place;
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
