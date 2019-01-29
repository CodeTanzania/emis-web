import React from 'react';
import alertIcon from '../assets/images/alerts.svg';
import geographicalFeaturesIcon from '../assets/images/geographicalfeatures.svg';
import incidentIcon from '../assets/images/incidents.svg';
import dashboardIcon from '../assets/images/dashboards.svg';
import stakeholderIcon from '../assets/images/stakeholders.svg';
import resourceIcon from '../assets/images/resources.svg';
import planIcon from '../assets/images/plans.svg';
import assessmentIcon from '../assets/images/assessments.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
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
  { name: 'Dashboards', path: '/dashboards', icon: dashboardIcon },
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
