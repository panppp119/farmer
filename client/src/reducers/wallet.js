import { fromJS } from "immutable";

import { ADD_FLASH_MESSAGE } from "actions/ui";
import {
  FETCH_WALLET,
  FETCH_WALLET_SUCCEEDED,
  ADD_WALLET,
  ADD_WALLET_SUCCEEDED,
  UPDATE_WALLET,
  UPDATE_WALLET_SUCCEEDED,
  DELETE_WALLET,
  DELETE_WALLET_SUCCEEDED
} from "actions/wallet";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case FETCH_WALLET:
    case ADD_WALLET:
    case UPDATE_WALLET:
    case DELETE_WALLET:
      return state.set("loading", true);

    case FETCH_WALLET_SUCCEEDED:
    case ADD_WALLET_SUCCEEDED:
    case UPDATE_WALLET_SUCCEEDED:
      return state.set("data", fromJS(response.body)).set("loading", false);

    case DELETE_WALLET_SUCCEEDED:
      return state.set("data", fromJS({})).set("loading", false);

    case ADD_FLASH_MESSAGE:
      return state.set("loading", false);

    default:
      return state;
  }
};
