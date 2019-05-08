import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router/immutable";

import CoreLayout from "./components/layouts/CoreLayout";

import "./styles/core.scss";
import theme from "styles/theme";
import configureStore, { history } from "utils/store";

const store = configureStore();
const auth = localStorage.getItem("token") !== null;

const Home = lazy(() => import("./routes/apps/Home"));
const SignIn = lazy(() => import("./routes/apps/SignIn"));

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign_in",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CoreLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path='/sign_in' component={SignIn} />

                <PrivateRoute exact path='/' component={Home} />
              </Switch>
            </Suspense>
          </CoreLayout>
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
