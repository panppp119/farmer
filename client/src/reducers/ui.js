import { fromJS } from "immutable";

import {
  ADD_FLASH_MESSAGE,
  REMOVE_FLASH_MESSAGE
} from "actions/ui";

const initialState = fromJS({});

export default (
  state = initialState,
  { type, scheme, response, error, status, payload, message }
) => {
  switch (type) {
    case ADD_FLASH_MESSAGE:
      return state.set('flash_message', fromJS(message))

    case REMOVE_FLASH_MESSAGE:
      return state.set('flash_message', fromJS({}))

    default:
      return state;
  }
};
