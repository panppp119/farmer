import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ui: require("./ui").default,
    auth: require("./auth").default,
    user: require("./user").default,
    address: require("./addresses").default,
    wallet: require("./wallet").default,
    market: require("./market").default
  });

export default rootReducer;
