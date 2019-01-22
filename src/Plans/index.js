import PropTypes from 'prop-types';
import React from 'react';
import alertIcon from '../assets/images/alerts.svg';
import assessmentIcon from '../assets/images/assessments.svg';
import incidentIcon from '../assets/images/incidents.svg';
import planIcon from '../assets/images/plans.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Emergency Planner', path: '/planner', icon: alertIcon },
  { name: 'Drills & Exercises', path: '/drills', icon: assessmentIcon },
  { name: 'Disseminations', path: '/disseminations', icon: planIcon },
  { name: 'Activations', path: '/activations', icon: incidentIcon },
];

/**
 * Emergency Plans Home page component allow navigation to emergency
 * plans modules
 *
 * @function
 * @name EmergencyPlans
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const EmergencyPlans = ({ match }) => (
  <NavigationMenu routes={routes} match={match} />
);

/* props validation */
EmergencyPlans.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

export default EmergencyPlans;
