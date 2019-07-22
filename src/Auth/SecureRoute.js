import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isTokenValid } from '@codetanzania/emis-api-client';
import PropTypes from 'prop-types';

/**
 * @function
 * @name SecureRoute
 * @description Route which check authentication status and route to appropriate
 *  component
 *
 * @param {object} props  React props
 * @param {object} props.component Component to be rendered
 * @param {object} props.rest rest All remaining props for secure root
 *
 * @returns {object} React Element
 *
 * @version 0.1.0
 * @since 0.1.0
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
            to={{ pathname: '/signin', state: { from: props.location } }} // eslint-disable-line
          />
        )
      }
    />
  );
};

/* props validation */
SecureRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

export default SecureRoute;
