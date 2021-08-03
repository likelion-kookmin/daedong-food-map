import produce from '../utils/produce.util';

export const initialState = {
  signinLoading: false,
  signinDone: false,
  signinError: null,
  user: null,
};

export const SIGN_IN_REQUEST = 'SIGNIN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGNIN_FAILURE';

export const signinRequestAction = (data) => ({
  type: SIGN_IN_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SIGN_IN_REQUEST:
        draft.signinLoading = true;
        draft.signinError = null;
        draft.signinDone = false;
        break;
      case SIGN_IN_SUCCESS:
        draft.signinLoading = false;
        draft.user = action.data;
        draft.signinDone = true;
        break;
      case SIGN_IN_FAILURE:
        draft.signinLoading = false;
        draft.signinError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
