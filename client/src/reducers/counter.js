import { fromJS } from 'immutable'

import {
  INCREMENT_REQUESTED,
  INCREMENT,
  DECREMENT_REQUESTED,
  DECREMENT
} from 'actions/counter'

const initialState = fromJS({
  count: 0,
  isIncrementing: false,
  isDecrementing: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return state.set('isIncrementing', true)

    case INCREMENT:
      return state.set('count', state.get('count') + 1)
                  .set('isIncrementing', false)

    case DECREMENT_REQUESTED:
      return state.set('isDecrementing', true)

    case DECREMENT:
      return state.set('count', state.get('count') - 1)
                  .set('isDecrementing', false)

    default:
      return state
  }
}
