import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isTokenValid } from '@codetanzania/emis-api-client';
import PropTypes from 'prop-types';

/**
 * @function
 * @name SecureRoute
 * @description Route which check authentication status and route to appropiate component
 *
 * @param {object} props  React props
 * @param {object} props.Component Component to be rendered
 *
 * @returns {object} React Element
 */
const SecureRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = isTokenValid();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }} // eslint-disable-line
          />
        )
      }
    />
  );
};

/* props validation */
SecureRoute.propTypes = {
  component: PropTypes.node.isRequired,
};

export default SecureRoute;
