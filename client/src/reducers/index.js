import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import verifyUserReducer from './verifyUserReducer';
import fetchRecentTempReducer from './fetchRecentTempReducer';
import fetchsensoridsReducer from './fetchsensoridsReducer';
import fetchtempbysensorReducer from './fetchtempbysensorReducer';
import alltempbysensorReducer from './alltempbysensorReducer';
import getchartdataReducer from './getchartdataReducer';

export default combineReducers({
  form: formReducer,
  user: verifyUserReducer,
  sensorids: fetchsensoridsReducer,
  recenttempbysensors: fetchtempbysensorReducer,
  alltempbysensor: alltempbysensorReducer,
  chartdata: getchartdataReducer,
  // last is not usedmuch
  fetchRecentTemp: fetchRecentTempReducer,
});