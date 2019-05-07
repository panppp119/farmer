import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles'

import CoreLayout from './components/layouts/CoreLayout'

import './styles/core.scss'
import theme from 'styles/theme'
import store from 'utils/store';

const Home = lazy(() => import('./routes/apps/Home'))

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
            <CoreLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path='/' component={Home} />
              </Switch>
            </Suspense>
          </CoreLayout>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
