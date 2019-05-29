import { fromJS } from "immutable";

import {
  FETCH_ADDRESSES,
  FETCH_ADDRESSES_SUCCEEDED,
  FETCH_ADDRESS,
  FETCH_ADDRESS_SUCCEEDED,
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
    case FETCH_ADDRESSES:
    case FETCH_ADDRESS:
    case ADD_ADDRESS:
    case UPDATE_ADDRESS:
    case DELETE_ADDRESS:
      return state.set("loading", true);

    case FETCH_ADDRESS_SUCCEEDED:
    case ADD_ADDRESS_SUCCEEDED:
    case UPDATE_ADDRESS_SUCCEEDED:
      return state.set("data", fromJS(response.body)).set("loading", false);

    case FETCH_ADDRESSES_SUCCEEDED:
      return state
        .set("collection", fromJS(response.body))
        .set("loading", false);

    case DELETE_ADDRESS_SUCCEEDED:
      return state
        .set("data", fromJS(response.body))
        .set("collection", fromJS(response.body))
        .set("loading", false);

    default:
      return state;
  }
};
