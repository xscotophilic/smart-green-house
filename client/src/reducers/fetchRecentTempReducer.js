import { FETCH_RECENTTEMP } from '../actions/types';

const fetchtempfunred =  (state = [], action) => {
  switch (action.type) {
    case FETCH_RECENTTEMP:
      return action.payload;
    default:
      return state;
  }
}

export default fetchtempfunred;