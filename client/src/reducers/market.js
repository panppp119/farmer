import { fromJS } from "immutable";

import { ADD_FLASH_MESSAGE } from "actions/ui";
import {
  FETCH_MARKET,
  FETCH_MARKET_SUCCEEDED,
  ADD_MARKET,
  ADD_MARKET_SUCCEEDED,
  UPDATE_MARKET,
  UPDATE_MARKET_SUCCEEDED,
  DELETE_MARKET,
  DELETE_MARKET_SUCCEEDED
} from "actions/market";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case FETCH_MARKET:
    case ADD_MARKET:
    case UPDATE_MARKET:
    case DELETE_MARKET:
      return state.set("loading", true);

    case FETCH_MARKET_SUCCEEDED:
    case ADD_MARKET_SUCCEEDED:
    case UPDATE_MARKET_SUCCEEDED:
    case DELETE_MARKET_SUCCEEDED:
      return state.set("data", fromJS(response.body)).set("loading", false);

    case ADD_FLASH_MESSAGE:
      return state.set("loading", false);

    default:
      return state;
  }
};
