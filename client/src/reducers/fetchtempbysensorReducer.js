import { FETCH_TEMP_BY_SENSOR_IDS } from '../actions/types';

const fetchtempbyids =  (state = [], action) => {
  switch (action.type) {
    case FETCH_TEMP_BY_SENSOR_IDS:
      return action.payload;
    default:
      return state;
  }
}

export default fetchtempbyids;