import PropTypes from 'prop-types';
import React from 'react';
import activationIcon from '../assets/images/activations.svg';
import plannerIcon from '../assets/images/planner.svg';
import disseminationIcon from '../assets/images/disseminations.svg';
import drillsAndExcercisesIcon from '../assets/images/drillsAndExercises.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Emergency Planner', path: '/planner', icon: plannerIcon },
  { name: 'Disseminations', path: '/disseminations', icon: disseminationIcon },
  { name: 'Activations', path: '/activations', icon: activationIcon },
  {
    name: 'Drills & Exercises',
    path: '/drills',
    icon: drillsAndExcercisesIcon,
  },
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
