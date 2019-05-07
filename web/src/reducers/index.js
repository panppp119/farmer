import { combineReducers } from 'redux'

export default combineReducers({
  // counter: require('./counter').default
  auth: require('./auth').default
})
