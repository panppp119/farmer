import { fromJS } from 'immutable'

import {
  SIGN_IN,
  SIGN_IN_SUCCEEDED,
  SIGN_UP,
  SIGN_UP_SUCCEEDED,
  SIGN_OUT,
  SIGN_OUT_SUCCEEDED,
  SUBMIT_PHONE_NUMBER
} from 'actions/auth'

const initialState = fromJS({})

export default (state = initialState, { type, scheme, response, error, payload }) => {
  switch (type) {
    case SIGN_IN:
    case SIGN_UP:
    case SIGN_OUT:
      return state.set('loading', true)

    case SUBMIT_PHONE_NUMBER:
      return state.set('loading', false)
                  .set('verifyCode', true)

    case SIGN_UP_SUCCEEDED:
    case SIGN_IN_SUCCEEDED:
      return state.set('user', fromJS(response.body))
                  .set('loading', false)
                  .set('verifyCode', false)

    case SIGN_OUT_SUCCEEDED:
      return state.set('user', fromJS({}))
                  .set('loading', false)

    default:
      return state
  }
}
