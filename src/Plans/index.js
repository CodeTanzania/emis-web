import PropTypes from 'prop-types';
import React from 'react';
import activationIcon from '../assets/icons/emergencyplans/activations-disabled.svg';
import disseminationIcon from '../assets/icons/emergencyplans/disseminations-disabled.svg';
import drillsAndExercisesIcon from '../assets/icons/emergencyplans/drillsandexercises-disabled.svg';
import plannerIcon from '../assets/icons/emergencyplans/planner.svg';
import proceduresIcon from '../assets/icons/emergencyplans/procedures.svg';
import activitiesIcon from '../assets/icons/emergencyplans/activities.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Emergency Planner', path: '/planner', icon: plannerIcon },
  {
    name: 'Emergency Plans Activities',
    path: '/activities',
    icon: activitiesIcon,
  },
  {
    name: 'Emergency Plans Procedures',
    path: '/procedures',
    icon: proceduresIcon,
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
 * @function
 * @name EmergencyPlans
 * @description Emergency Plans Home page component allow navigation to emergency
 * plans modules
 *
 * @param {Object} props props object
 * @param {Object} props.match match object inserted by react router
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
