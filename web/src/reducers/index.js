import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: require("./auth").default,
    user: require("./user").default,
    addresses: require("./addresses").default
  });

export default rootReducer;
