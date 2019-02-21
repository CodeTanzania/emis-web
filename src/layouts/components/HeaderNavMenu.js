import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import alertIcon from '../../assets/icons/alerts.svg';
import dashboardIcon from '../../assets/icons/dashboards-disabled.svg';
import geographicalFeaturesIcon from '../../assets/icons/geographicalfeatures.svg';
import incidentIcon from '../../assets/icons/incidents-disabled.svg';
import stakeholderIcon from '../../assets/icons/stakeholders.svg';
import resourceIcon from '../../assets/icons/resources.svg';
import planIcon from '../../assets/icons/emergencyplans.svg';
import assessmentIcon from '../../assets/icons/assessments.svg';
import './styles.css';

const routes = [
  { name: 'Alerts', path: '/alerts', icon: alertIcon },
  { name: 'Assessments', path: '/assessments', icon: assessmentIcon },
  { name: 'Emergency Plans', path: '/plans', icon: planIcon },
  {
    name: 'Geographical Features',
    path: '/geographicalfeatures',
    icon: geographicalFeaturesIcon,
  },
  { name: 'Incidents', path: '/incidents', icon: incidentIcon, disabled: true },
  { name: 'Resources', path: '/resources', icon: resourceIcon },
  { name: 'Stakeholders', path: '/stakeholders', icon: stakeholderIcon },
  {
    name: 'Dashboards',
    path: '/dashboards',
    icon: dashboardIcon,
    disabled: true,
  },
];

/**
 * @function
 * @name NavItem
 * @description Navigation menu item that have icon(image) and name for the
 * module to navigate to
 *
 * @param {Object} props props object
 * @param {string} props.name  name/description/label for nav item
 * @param {string} props.icon  path to svg image used as nav icon
 * @param {string} props.path  path to navigate to when clicked
 * @param {boolean} props.disabled flag to mark navigation item if is disabled
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const NavItem = ({ name, icon, path, disabled }) => (
  <Link to={path}>
    <div className="NavItem">
      <img
        src={icon}
        alt={`${name} icon not available`}
        width={50}
        height={50}
        className="image"
      />
      <span className={`text ${disabled ? 'text-disabled' : ''}`}>{name}</span>
    </div>
  </Link>
);

/**
 * @function
 * @name Home
 * @description Home route which shows to navigation icon
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ModuleNavMenu = () => (
  <div className="ModuleNavMenu">
    <Row type="flex" align="middle">
      {routes.map(route => (
        <Col key={route.path} span={12}>
          <NavItem
            name={route.name}
            icon={route.icon}
            path={route.disabled ? '#' : route.path}
            disabled={route.disabled}
          />
        </Col>
      ))}
    </Row>
  </div>
);

/* props validation */
NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
};

export default ModuleNavMenu;
