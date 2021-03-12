import { FETCH_MOIST_BY_SENSOR_IDS } from '../actions/types';

const fetchmoistbyids =  (state = [], action) => {
  switch (action.type) {
    case FETCH_MOIST_BY_SENSOR_IDS:
      return action.payload;
    default:
      return state;
  }
}

export default fetchmoistbyids;