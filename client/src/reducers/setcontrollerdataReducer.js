import { SET_CONTROLLER_STATUS } from "../actions/types";

export default function foo(state = null, action) {
  switch (action.type) {
    case SET_CONTROLLER_STATUS:
      return action.payload;
    default:
      return state;
  }
}
