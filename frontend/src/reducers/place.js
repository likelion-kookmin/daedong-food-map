import produceUtil from 'utils/produce.util';

export const initialState = {
  mainPlaces: [],
  singlePlace: null,
  loadPlacesLoading: false,
  loadPlacesDone: false,
  loadPlacesError: null,
  loadPlaceLoading: false,
  loadPlaceDone: false,
  loadPlaceError: null,
};

export const LOAD_PLACES_REQUEST = 'LOAD_PLACES_REQUEST';
export const LOAD_PLACES_SUCCESS = 'LOAD_PLACES_SUCCESS';
export const LOAD_PLACES_FAILURE = 'LOAD_PLACES_FAILURE';
export const LOAD_PLACE_REQUEST = 'LOAD_PLACE_REQUEST';
export const LOAD_PLACE_SUCCESS = 'LOAD_PLACE_SUCCESS';
export const LOAD_PLACE_FAILURE = 'LOAD_PLACE_FAILURE';

const reducer = (state = initialState, action) =>
  produceUtil(state, (draft) => {
    switch (action.type) {
      case LOAD_PLACES_REQUEST:
        draft.loadPlacesLoading = true;
        draft.loadPlacesDone = false;
        draft.loadPlacesError = null;
        break;
      case LOAD_PLACES_SUCCESS: // TODO: 이후 Search 기능을 활용한 부분도 고려해야함.
        draft.loadPlacesLoading = false;
        draft.loadPlacesDone = true;
        draft.mainPlaces = action.data;
        break;
      case LOAD_PLACES_FAILURE:
        draft.loadPlacesLoading = false;
        draft.loadPlacesError = action.error;
        break;
      case LOAD_PLACE_REQUEST:
        draft.loadPlaceLoading = true;
        draft.loadPlaceDone = false;
        draft.loadPlaceError = null;
        break;
      case LOAD_PLACE_SUCCESS: // TODO: 이후 Search 기능을 활용한 부분도 고려해야함.
        draft.loadPlaceLoading = false;
        draft.loadPlaceDone = true;
        draft.singlePlace = action.data;
        break;
      case LOAD_PLACE_FAILURE:
        draft.loadPlaceLoading = false;
        draft.loadPlaceError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
