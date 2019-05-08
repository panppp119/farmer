import { fromJS } from "immutable";

import {
  SIGN_IN,
  SIGN_IN_SUCCEEDED,
  SIGN_OUT,
  SIGN_OUT_SUCCEEDED,
  SUBMIT_PHONE_NUMBER,
  CANCEL_VERIFICATION
} from "actions/auth";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, payload }
) => {
  switch (type) {
    case SIGN_IN:
    case SIGN_OUT:
      return state.set("loading", true);

    case SUBMIT_PHONE_NUMBER:
      return state.set("loading", false).set("verifyCode", true);

    case SIGN_IN_SUCCEEDED:
      return state
        .set("user", fromJS(response))
        .set("loading", false)
        .set("verifyCode", false);

    case SIGN_OUT_SUCCEEDED:
      return state.set("user", fromJS({})).set("loading", false);

    case CANCEL_VERIFICATION:
      return state.set("verifyCode", false);

    default:
      return state;
  }
};
