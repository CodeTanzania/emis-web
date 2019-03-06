import React from 'react';
import UIState from './index';

/**
 * @function
 * @name PageNotFound
 * @description Page not found component for error 404
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const PageNotFound = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="info-circle"
      description="Sorry Page not Found, Please return to Home Page"
    />
  </div>
);

export default PageNotFound;
