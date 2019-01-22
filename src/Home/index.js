import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import alertIcon from '../assets/images/alerts.svg';
import geographicalFeaturesIcon from '../assets/images/geographicalfeatures.svg';
import incidentIcon from '../assets/images/incidents.svg';
import stakeholderIcon from '../assets/images/stakeholders.svg';
import resourceIcon from '../assets/images/resources.svg';
import planIcon from '../assets/images/plans.svg';
import assessmentIcon from '../assets/images/assessments.svg';
import './styles.css';

const components = [
  { name: 'Alerts', path: '/alerts', icon: alertIcon },
  { name: 'Assessment', path: '/assessments', icon: assessmentIcon },
  { name: 'Emergency Plans', path: '/plans', icon: planIcon },
  {
    name: 'Geographical Features',
    path: '/geographicalfeatures',
    icon: geographicalFeaturesIcon,
  },
  { name: 'Incidents', path: '/incidents', icon: incidentIcon },
  { name: 'Resources', path: '/resources', icon: resourceIcon },
  { name: 'Stakeholders', path: '/stakeholders', icon: stakeholderIcon },
];

/**
 * Navigation menu item that have icon(image) and name for the module to
 * navigate to
 *
 *  @function
 * @name NavItem
 *
 * @param {Object} props
 * @param {string} props.name - name/description/label for nav item
 * @param {string} props.icon - path to svg image used as nav icon
 * @param {string} props.path - path to navigate to when clicked
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const NavItem = ({ name, icon, path }) => (
  <Link to={path}>
    <div className="NavItem">
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
 * Home component which shows to navigation Nav
 *
 * @function
 * @name Home
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Home = () => (
  <div className="Home">
    <Row type="flex" align="middle" justify="center">
      {components.map(component => (
        <Col key={component.path} span={8}>
          <NavItem
            name={component.name}
            icon={component.icon}
            path={component.path}
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
};

export default Home;
