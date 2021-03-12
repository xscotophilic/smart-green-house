import { FETCH_ALL_MOISTURE_BY_SENSOR_IDS } from '../actions/types';

const allmoistbyids =  (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_MOISTURE_BY_SENSOR_IDS:
      return action.payload;
    default:
      return state;
  }
}

export default allmoistbyids;