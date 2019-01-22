import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

/**
 * Navigation menu item that have icon(image) and name for the module to
 * navigate to
 *
 * @function
 * @name NavigationMenuItem
 *
 * @param {Object} props
 * @param {string} props.name - name/description/label for nav item
 * @param {string} props.icon - path to svg image used as nav icon
 * @param {string} props.path - path to navigate to when clicked
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const NavigationMenuItem = ({ name, icon, path }) => (
  <Link to={path}>
    <div className="NavigationMenuItem">
      <img
        src={icon}
        alt={`${name} icon not available`}
        width={130}
        height={130}
        className="image"
      />
      <span className="text">{name}</span>
    </div>
  </Link>
);

/**
 * Navigation Menu which renders provided routes
 *
 * @function
 * @name Home
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const NavigationMenu = ({ routes, match }) => {
  let url = '';
  let colSpan = 12;

  if (match) {
    ({ url } = match);
  }

  if (routes.length > 4) {
    colSpan = 8;
  }

  return (
    <div className="NavigationMenu">
      <Row type="flex" align="middle">
        {routes.map(route => (
          <Col key={route.path} span={colSpan}>
            <NavigationMenuItem
              name={route.name}
              icon={route.icon}
              path={url + route.path}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

/* props validation */
NavigationMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
NavigationMenu.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  match: PropTypes.shape({ url: PropTypes.string }),
};
NavigationMenu.defaultProps = {
  match: undefined,
};

export default NavigationMenu;
