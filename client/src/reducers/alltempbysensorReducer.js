import { FETCH_ALL_TEMP_BY_SENSOR_IDS } from '../actions/types';

const alltempbyids =  (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL_TEMP_BY_SENSOR_IDS:
      return action.payload;
    default:
      return state;
  }
}

export default alltempbyids;