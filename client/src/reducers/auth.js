import { fromJS } from "immutable";

import {
  SIGN_IN,
  SIGN_IN_SUCCEEDED,
  SIGN_OUT,
  SIGN_OUT_SUCCEEDED
} from "actions/auth";

import { ADD_FLASH_MESSAGE } from 'actions/ui'

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case SIGN_IN:
    case SIGN_OUT:
      return state.set("loading", true);

    case SIGN_IN_SUCCEEDED:
      return state
        .set("user", fromJS(response.body))
        .set("loading", false)

    case SIGN_OUT_SUCCEEDED:
      return state.set("user", fromJS({})).set("loading", false);

    case ADD_FLASH_MESSAGE:
      return state.set("loading", false);

    default:
      return state;
  }
};
