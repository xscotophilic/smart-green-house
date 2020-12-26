
import { VERIFY_USER } from '../actions/types';

export default function foo (state = null, action) {
    switch (action.type) {
        case VERIFY_USER:
            return action.payload;
        default:
            return state;
    }
}