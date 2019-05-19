import { fromJS } from "immutable";

import {
  ADD_ADDRESS,
  ADD_ADDRESS_SUCCEEDED,
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_SUCCEEDED,
  DELETE_ADDRESS,
  DELETE_ADDRESS_SUCCEEDED
} from "actions/addresses";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case ADD_ADDRESS:
    case UPDATE_ADDRESS:
    case DELETE_ADDRESS:
      return state.set("loading", true);

    case ADD_ADDRESS_SUCCEEDED:
    case UPDATE_ADDRESS_SUCCEEDED:
      return state.set("data", fromJS(response)).set("loading", false);

    case DELETE_ADDRESS_SUCCEEDED:
      return state.set("data", fromJS({})).set("loading", false);

    default:
      return state;
  }
};
