import { StoreProvider, initializeApp } from '@codetanzania/emis-api-states';
import { isTokenValid } from '@codetanzania/emis-api-client';
import { Icon, Spin } from 'antd';
import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Signin from './Auth/components/Signin';
import BaseLayout from './layouts/BaseLayout';
import SecureRoute from './Auth/SecureRoute';

/* configure global spin indicator */
Spin.setDefaultIndicator(<Icon type="loading" style={{ fontSize: 24 }} spin />);

const App = () => {
  if (isTokenValid) {
    initializeApp();
  }

  return (
    <StoreProvider>
      <HashRouter hashType="hashbang">
        <Switch>
          <SecureRoute path="/app" component={BaseLayout} />
          <Route path="/signin" component={Signin} />
          <Redirect to="/app" />
        </Switch>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
