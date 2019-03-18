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

const routes = [
  {
    name: 'Alerts',
    path: '/alerts',
    icon: alertIcon,
    description:
      'Includes up to date database of ingested emergency/disaster alerts from multiple sources in near real-time, disseminate them to disaster management stakeholders',
  },
  {
    name: 'Assessment',
    path: '/assessments',
    icon: assessmentIcon,
    description:
      'Includes up to date database of ingested emergency/disaster alerts from multiple sources in near real-time, disseminate them to disaster management',
  },
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
