import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: require("./auth").default
  });

export default rootReducer;
