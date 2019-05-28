import { initializeApp, StoreProvider } from '@codetanzania/emis-api-states';
import { Icon, Spin } from 'antd';
import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import SecureRoute from './Auth/SecureRoute';

// populate app store with schemas
initializeApp();

/* configure global spin indicator */
Spin.setDefaultIndicator(<Icon type="loading" style={{ fontSize: 24 }} spin />);

const App = () => (
  <StoreProvider>
    <HashRouter hashType="hashbang">
      <Switch>
        <SecureRoute path="/" component={BaseLayout} />
        {/* <Route exact path="/login" component={} /> */}
      </Switch>
    </HashRouter>
  </StoreProvider>
);

export default App;
