import { Empty } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import icon404 from '../../assets/icons/states/404.svg';

/**
 * @function
 * @name PageNotFound
 * @description Page not found component for error 404
 *
 * @returns {React.Component} Page not found component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const PageNotFound = () => (
  <div style={{ marginTop: '15%' }}>
    <Empty description="Sorry Page not Found" image={icon404}>
      <Link to="/">Return to Home Page</Link>
    </Empty>
  </div>
);

export default PageNotFound;
