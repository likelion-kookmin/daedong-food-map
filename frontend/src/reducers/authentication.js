import produceUtil from '../utils/produce.util';

const user = JSON.parse(localStorage.getItem('user'));

export const initialState = {
  signinLoading: false,
  signinDone: false,
  signinError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  user: user,
};

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const signinRequestAction = (data) => ({
  type: SIGN_IN_REQUEST,
  data,
});

const reducer = (state = initialState, action) =>
  produceUtil(state, (draft) => {
    switch (action.type) {
      case SIGN_IN_REQUEST:
        draft.signinLoading = true;
        localStorage.removeItem('user');
        draft.signinError = null;
        draft.signinDone = false;
        break;
      case SIGN_IN_SUCCESS:
        draft.signinLoading = false;
        draft.user = action.data;
        localStorage.setItem('user', JSON.stringify(action.data));
        draft.signinDone = true;
        break;
      case SIGN_IN_FAILURE:
        draft.signinLoading = false;
        draft.signinError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signupLoading = true;
        localStorage.removeItem('user');
        draft.signupError = null;
        draft.signupDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signupLoading = false;
        draft.user = action.data;
        localStorage.setItem('user', JSON.stringify(action.data));
        draft.signupDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signupLoading = false;
        draft.signupError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
