import { fromJS } from "immutable";

import { ADD_FLASH_MESSAGE } from "actions/ui";
import {
  FETCH_FARMS,
  FETCH_FARMS_SUCCEEDED,
  ADD_FARM,
  ADD_FARM_SUCCEEDED,
  UPDATE_FARM,
  UPDATE_FARM_SUCCEEDED,
  DELETE_FARM,
  DELETE_FARM_SUCCEEDED
} from "actions/farms";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case FETCH_FARMS:
    case ADD_FARM:
    case UPDATE_FARM:
    case DELETE_FARM:
      return state.set("loading", true);

    case FETCH_FARMS_SUCCEEDED:
    case ADD_FARM_SUCCEEDED:
    case UPDATE_FARM_SUCCEEDED:
      return state.set("data", fromJS(response.body)).set("loading", false);

    case DELETE_FARM_SUCCEEDED:
      return state.set("data", fromJS({})).set("loading", false);

    case ADD_FLASH_MESSAGE:
      return state.set("loading", false);

    default:
      return state;
  }
};
