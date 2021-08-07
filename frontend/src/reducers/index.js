import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import authentication from './authentication';
import place from './place';
import inquiry from './inquiry';
import report from './report';
import map from './map';

// (이전상태, 액션) => 다음상태
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        authentication,
        inquiry,
        place,
        report,
        map,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
