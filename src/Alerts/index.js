import PropTypes from 'prop-types';
import React from 'react';
import alertIcon from '../assets/images/alerts.svg';
import assessmentIcon from '../assets/images/assessments.svg';
import incidentIcon from '../assets/images/incidents.svg';
import planIcon from '../assets/images/plans.svg';
import resourceIcon from '../assets/images/resources.svg';
import stakeholderIcon from '../assets/images/stakeholders.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'All Alerts', path: '/alerts', icon: alertIcon },
  { name: 'Actions Taken', path: '/actions', icon: assessmentIcon },
  { name: 'Alerts Feed', path: '/feeds', icon: planIcon },
  { name: 'Surveys & Feedbacks', path: '/feedback', icon: incidentIcon },
  { name: 'Sources', path: '/sources', icon: stakeholderIcon },
  { name: 'Service Requests', path: '/servicerequests', icon: resourceIcon },
];

/**
 * Alerts component which shows to navigation Nav
 *
 * @function
 * @name Alerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Alerts = ({ match }) => <NavigationMenu match={match} routes={routes} />;

/* props validation */
Alerts.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

export default Alerts;
