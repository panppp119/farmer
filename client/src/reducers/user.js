import { fromJS } from "immutable";

import {
  FETCH_USER,
  FETCH_USER_SUCCEEDED,
  UPDATE_USER,
  UPDATE_USER_SUCCEEDED,
  DELETE_USER,
  DELETE_USER_SUCCEEDED
} from "actions/user";

import { SIGN_IN_SUCCEEDED, SIGN_OUT_SUCCEEDED } from "actions/auth";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case FETCH_USER:
    case UPDATE_USER:
    case DELETE_USER:
      return state.set("loading", true);

    case FETCH_USER_SUCCEEDED:
    case UPDATE_USER_SUCCEEDED:
      return state.set("data", fromJS(response.body)).set("loading", false);

    case DELETE_USER_SUCCEEDED:
      return state.set("data", fromJS({})).set("loading", false);

    case SIGN_IN_SUCCEEDED:
      return state
        .set("data", fromJS(response.body.currentUser))
        .set("loading", false);

    case SIGN_OUT_SUCCEEDED:
      return state.set("loading", false);

    default:
      return state;
  }
};
