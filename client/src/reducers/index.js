import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import verifyUserReducer from "./verifyUserReducer";
import fetchRecentTempReducer from "./fetchRecentTempReducer";
import fetchmoisturesensoridsReducer from "./fetchmoisturesensoridsReducer";
import fetchsensoridsReducer from "./fetchsensoridsReducer";
import fetchtempbysensorReducer from "./fetchtempbysensorReducer";
import alltempbysensorReducer from "./alltempbysensorReducer";
import allmoistbysensorReducer from "./allmoistbysensorReducer";
import getchartdataReducer from "./getchartdataReducer";
import getcontrollerdataReducer from "./getcontrollerdataReducer";
import setcontrollerdataReducer from "./setcontrollerdataReducer";
import fetchmoistbysensorReducer from "./fetchmoistbysensorReducer";
import getmoistcontrollerdataReducer from "./getmoistcontrollerdataReducer";

export default combineReducers({
  form: formReducer,
  user: verifyUserReducer,
  sensorids: fetchsensoridsReducer,
  recenttempbysensors: fetchtempbysensorReducer,
  alltempbysensor: alltempbysensorReducer,
  chartdata: getchartdataReducer,
  gcontrollerdata: getcontrollerdataReducer,
  setcontrollerdata: setcontrollerdataReducer,
  // last is not usedmuch
  fetchRecentTemp: fetchRecentTempReducer,

  // Moisture sensors
  moisturesensorids: fetchmoisturesensoridsReducer,
  allmoistbysensor: allmoistbysensorReducer,
  recentmoistbysensors: fetchmoistbysensorReducer,
  moistcontrollerdata: getmoistcontrollerdataReducer
});