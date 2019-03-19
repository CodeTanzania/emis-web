import React from 'react';
import alertIcon from '../assets/icons/alerts.svg';
import geographicalFeaturesIcon from '../assets/icons/geographicalfeatures.svg';
import incidentIcon from '../assets/icons/incidents-disabled.svg';
import dashboardIcon from '../assets/icons/dashboards-disabled.svg';
import stakeholderIcon from '../assets/icons/stakeholders.svg';
import resourceIcon from '../assets/icons/resources.svg';
import planIcon from '../assets/icons/emergencyplans.svg';
import assessmentIcon from '../assets/icons/assessments.svg';
import NavigationMenu from '../components/NavigationMenu';
import modules from '../modules.json';

const routes = [
  {
    name: 'Alerts',
    path: '/alerts',
    icon: alertIcon,
    description: modules.alerts,
  },
  {
    name: 'Assessment',
    path: '/assessments',
    icon: assessmentIcon,
    description: modules.assessments,
  },
  {
    name: 'Emergency Plans',
    path: '/plans',
    icon: planIcon,
    description: modules.emergencyPlans,
  },
  {
    name: 'Geographical Features',
    path: '/geographicalfeatures',
    icon: geographicalFeaturesIcon,
    description: modules.geographicalFeatures,
  },
  {
    name: 'Incidents',
    path: '/incidents',
    icon: incidentIcon,
    description: modules.incidents,
    disabled: true,
  },
  {
    name: 'Resources',
    path: '/resources',
    icon: resourceIcon,
    description: modules.resources,
  },
  {
    name: 'Stakeholders',
    path: '/stakeholders',
    icon: stakeholderIcon,
    description: modules.stakeholders,
  },
  {
    name: 'Dashboards',
    path: '/dashboards',
    icon: dashboardIcon,
    description: modules.dashboards,
    disabled: true,
  },
];

/**
 * Home component which shows to navigation Nav
 *
 * @function
 * @name Home
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Home = () => <NavigationMenu routes={routes} />;

export default Home;
