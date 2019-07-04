import React from 'react';
import alertIcon from '../assets/icons/alerts.svg';
import assessmentIcon from '../assets/icons/assessments-disabled.svg';
import dashboardIcon from '../assets/icons/dashboards.svg';
import planIcon from '../assets/icons/emergencyplans-disabled.svg';
import geographicalFeaturesIcon from '../assets/icons/geographicalfeatures-disabled.svg';
import incidentIcon from '../assets/icons/incidents-disabled.svg';
import resourceIcon from '../assets/icons/resources-disabled.svg';
import stakeholderIcon from '../assets/icons/stakeholders.svg';
import NavigationMenu from '../components/NavigationMenu';
import modules from '../modules.json';

/* constants */
const routes = [
  {
    name: 'Alerts',
    path: '/app/alerts',
    icon: alertIcon,
    description: modules.alerts,
  },
  {
    name: 'Assessment',
    path: '/app/assessments',
    icon: assessmentIcon,
    description: modules.assessments,
    disabled: true,
  },
  { name: 'Emergency Plans', path: '/plans', icon: planIcon, disabled: true },
  {
    name: 'Geographical Features',
    path: '/app/geographicalfeatures',
    icon: geographicalFeaturesIcon,
    description: modules.geographicalfeatures,
    disabled: true,
  },
  {
    name: 'Incidents',
    path: '/app/incidents',
    icon: incidentIcon,
    description: modules.incidents,
    disabled: true,
  },
  {
    name: 'Resources',
    path: '/app/resources',
    icon: resourceIcon,
    description: modules.resources,
    disabled: true,
  },
  {
    name: 'Stakeholders',
    path: '/app/stakeholders',
    icon: stakeholderIcon,
    description: modules.stakeholders,
  },
  {
    name: 'Dashboards',
    path: '/app/overview',
    icon: dashboardIcon,
    description: modules.dashboards,
  },
];

/**
 * @function
 * @name Home
 * @description Home component which shows to base navigation menu
 *
 * @returns {object} Navigation Menu
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Home = () => <NavigationMenu routes={routes} />;

export default Home;
