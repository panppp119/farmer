import { fromJS } from "immutable";

import { ADD_FLASH_MESSAGE } from "actions/ui";
import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_SUCCEEDED,
  ADD_TRANSACTION,
  ADD_TRANSACTION_SUCCEEDED,
  UPDATE_TRANSACTION,
  UPDATE_TRANSACTION_SUCCEEDED,
  DELETE_TRANSACTION,
  DELETE_TRANSACTION_SUCCEEDED
} from "actions/transactions";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case FETCH_TRANSACTIONS:
    case ADD_TRANSACTION:
    case UPDATE_TRANSACTION:
    case DELETE_TRANSACTION:
      return state.set("loading", true);

    case FETCH_TRANSACTIONS_SUCCEEDED:
    case ADD_TRANSACTION_SUCCEEDED:
    case UPDATE_TRANSACTION_SUCCEEDED:
      return state.set("data", fromJS(response.body)).set("loading", false);

    case DELETE_TRANSACTION_SUCCEEDED:
      return state.set("data", fromJS({})).set("loading", false);

    case ADD_FLASH_MESSAGE:
      return state.set("loading", false);

    default:
      return state;
  }
};
