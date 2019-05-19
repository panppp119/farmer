import { fromJS } from "immutable";

import {
  SIGN_IN,
  SIGN_IN_SUCCEEDED,
  SIGN_UP,
  SIGN_UP_SUCCEEDED,
  SIGN_OUT,
  SIGN_OUT_SUCCEEDED,
  CHECK_SESSION
} from "actions/auth";

import { ADD_FLASH_MESSAGE } from 'actions/ui'

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload, token }
) => {
  switch (type) {
    case SIGN_IN:
    case SIGN_UP:
    case SIGN_OUT:
      return state.set("loading", true);

    case SIGN_IN_SUCCEEDED:
    case SIGN_UP_SUCCEEDED:
      return state
        .set("access_token", fromJS(response.body.access_token))
        .set("currentUser", fromJS(response.body.currentUser))
        .set("loading", false)

    case SIGN_OUT_SUCCEEDED:
      return state.set("loading", false)
                  .set("access_token", fromJS({}))
                  .set("currentUser", fromJS({}))

    case CHECK_SESSION:
      return state.set("access_token", fromJS(token));

    case ADD_FLASH_MESSAGE:
      return state.set("loading", false);

    default:
      return state;
  }
};
