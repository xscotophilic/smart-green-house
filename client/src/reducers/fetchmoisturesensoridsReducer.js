import { FETCH_MOISTURE_SENSOR_IDS } from '../actions/types';

const fetchmoistureids =  (state = [], action) => {
  switch (action.type) {
    case FETCH_MOISTURE_SENSOR_IDS:
      return action.payload;
    default:
      return state;
  }
}

export default fetchmoistureids;