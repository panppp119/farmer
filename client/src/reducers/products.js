import { fromJS } from "immutable";

import { ADD_FLASH_MESSAGE } from "actions/ui";
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCEEDED,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCEEDED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCEEDED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCEEDED
} from "actions/products";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case FETCH_PRODUCTS:
    case ADD_PRODUCT:
    case UPDATE_PRODUCT:
    case DELETE_PRODUCT:
      return state.set("loading", true);

    case FETCH_PRODUCTS_SUCCEEDED:
    case ADD_PRODUCT_SUCCEEDED:
    case UPDATE_PRODUCT_SUCCEEDED:
      return state.set("data", fromJS(response.body)).set("loading", false);

    case DELETE_PRODUCT_SUCCEEDED:
      return state.set("data", fromJS({})).set("loading", false);

    case ADD_FLASH_MESSAGE:
      return state.set("loading", false);

    default:
      return state;
  }
};
