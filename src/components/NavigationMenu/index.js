import { Col, Popover, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

/**
 * @function
 * @name NavigationMenuItem
 * @description Navigation menu item that have icon(image) and name for
 * the module to navigate to
 *
 * @param {Object} props props object
 * @param {string} props.name  name/description/label for nav item
 * @param {string} props.icon  path to svg image used as nav icon
 * @param {string} props.path  path to navigate to when clicked
 * @param {boolean} props.disabled flag to mark it navigation menu is disabled
 * @param {boolean} props.description module description
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const NavigationMenuItem = ({ name, icon, path, disabled, description }) => (
  <Link to={path}>
    {description ? (
      <Popover
        content={
          <p
            style={{
              width: '200px',
              textAlign: 'justify',
              textJustify: 'auto',
            }}
          >
            {description}
          </p>
        }
        placement="bottom"
      >
        <div className="NavigationMenuItem">
          <img
            src={icon}
            alt={`${name} icon not available`}
            width={130}
            height={130}
            className="image"
          />
          <span className={`text ${disabled ? 'text-disabled' : ''}`}>
            {name}
          </span>
        </div>
      </Popover>
    ) : (
      <div className="NavigationMenuItem">
        <img
          src={icon}
          alt={`${name} icon not available`}
          width={130}
          height={130}
          className="image"
        />
        <span className={`text ${disabled ? 'text-disabled' : ''}`}>
          {name}
        </span>
      </div>
    )}
  </Link>
);

/**
 * @function
 * @name NavigationMenu
 * @description Navigation Menu which renders provided routes
 *
 * @param {Object} props props object
 * @param {Object[]} props.routes list of all navigation routes
 * @param {Object} props.match match object from react router
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const NavigationMenu = ({ routes, match }) => {
  let url = '';
  let colSpan = { span: 12 };

  if (match) {
    ({ url } = match);
  }

  if (routes.length > 4) {
    colSpan = { xxl: 8, xl: 8, lg: 8, md: 8, sm: 12, xs: 12 };
  }

  return (
    <div className="NavigationMenu">
      <Row type="flex" align="middle">
        {routes.map(route => (
          <Col key={route.path} {...colSpan}>
            <NavigationMenuItem
              name={route.name}
              icon={route.icon}
              path={route.disabled ? '#' : url + route.path}
              disabled={route.disabled}
              description={route.description}
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
  description: PropTypes.string,
  disabled: PropTypes.bool,
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
NavigationMenuItem.defaultProps = {
  disabled: false,
  description: undefined,
};

export default NavigationMenu;
