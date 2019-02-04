import PropTypes from 'prop-types';
import React from 'react';
import activationIcon from '../assets/icons/emergencyplans/activations-disabled.svg';
import disseminationIcon from '../assets/icons/emergencyplans/disseminations-disabled.svg';
import drillsAndExercisesIcon from '../assets/icons/emergencyplans/drillsandexercises-disabled.svg';
import plannerIcon from '../assets/icons/emergencyplans/planner.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Emergency Planner', path: '/planner', icon: plannerIcon },
  {
    name: 'Emergency Plans Activities',
    path: '/activities',
    icon: plannerIcon,
  },
  {
    name: 'Emergency Plans Procedures',
    path: '/procedures',
    icon: plannerIcon,
  },
  {
    name: 'Disseminations',
    path: '/disseminations',
    icon: disseminationIcon,
    disabled: true,
  },
  {
    name: 'Activations',
    path: '/activations',
    icon: activationIcon,
    disabled: true,
  },
  {
    name: 'Drills & Exercises',
    path: '/drills',
    icon: drillsAndExercisesIcon,
    disabled: true,
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
