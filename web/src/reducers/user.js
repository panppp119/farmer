import { fromJS } from "immutable";

import {
  UPDATE_USER,
  UPDATE_USER_SUCCEEDED,
  DELETE_USER,
  DELETE_USER_SUCCEEDED
} from "actions/user";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case UPDATE_USER:
    case DELETE_USER:
      return state.set("loading", true);

    case UPDATE_USER_SUCCEEDED:
      return state.set("data", fromJS(response)).set("loading", false);

    case DELETE_USER_SUCCEEDED:
      return state.set("data", fromJS({})).set("loading", false);

    default:
      return state;
  }
};
