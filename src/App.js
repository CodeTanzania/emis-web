import { initializeApp, StoreProvider } from '@codetanzania/emis-api-states';
import { Icon, Spin } from 'antd';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';

// populate app store with schemas
initializeApp();

/* configure global spin indicator */
Spin.setDefaultIndicator(<Icon type="loading" style={{ fontSize: 24 }} spin />);

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  </StoreProvider>
);

export default App;
