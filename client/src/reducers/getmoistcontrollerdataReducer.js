
import { GET_MOIST_CONTROLLER_STATUS } from '../actions/types';

export default function foo (state = null, action) {
    switch (action.type) {
        case GET_MOIST_CONTROLLER_STATUS:
            return action.payload;
        default:
            return state;
    }
}