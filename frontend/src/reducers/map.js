import produceUtil from 'utils/produce.util';

export const initialState = {
  map: null,
  storeList: [],
  oldMarker: [],
  oldOverlay: [],
};

export const SET_MAP = 'SET_MAP';
export const SET_STORE_LIST = 'SET_STORE_LIST';
export const ADD_MARKER = 'ADD_MARKER';

const reducer = (state = initialState, action) =>
  produceUtil(state, (draft) => {
    switch (action.type) {
      case SET_MAP:
        draft.map = action.map;
        break;
      case SET_STORE_LIST:
        break;
      case ADD_MARKER:
        break;
      default:
        break;
    }
  });

export default reducer;
