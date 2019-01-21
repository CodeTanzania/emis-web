import { StoreProvider } from '@codetanzania/emis-api-states';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  </StoreProvider>
);

export default App;
