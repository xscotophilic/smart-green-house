
import { GET_CHART_DATA } from '../actions/types';

export default function foo (state = null, action) {
    switch (action.type) {
        case GET_CHART_DATA:
            return action.payload;
        default:
            return state;
    }
}