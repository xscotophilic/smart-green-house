import { FETCH_SENSOR_IDS } from '../actions/types';

const fetchids =  (state = [], action) => {
  switch (action.type) {
    case FETCH_SENSOR_IDS:
      return action.payload;
    default:
      return state;
  }
}

export default fetchids;