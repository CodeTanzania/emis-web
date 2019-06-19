import PropTypes from 'prop-types';
import React from 'react';
import activationIcon from '../assets/icons/emergencyplans/activations-disabled.svg';
import disseminationIcon from '../assets/icons/emergencyplans/disseminations-disabled.svg';
import drillsAndExercisesIcon from '../assets/icons/emergencyplans/drillsandexercises-disabled.svg';
import plannerIcon from '../assets/icons/emergencyplans/planner.svg';
import proceduresIcon from '../assets/icons/emergencyplans/procedures.svg';
import activitiesIcon from '../assets/icons/emergencyplans/activities.svg';
import NavigationMenu from '../components/NavigationMenu';
import modules from '../modules.json';

const routes = [
  {
    name: 'Emergency Planner',
    path: '/planner',
    icon: plannerIcon,
    description: modules.emergencyPlansPlanner,
  },
  {
    name: 'Emergency Plans Activities',
    path: '/activities',
    icon: activitiesIcon,
    description: modules.emergencyPlansActivities,
  },
  {
    name: 'Emergency Plans Procedures',
    path: '/procedures',
    icon: proceduresIcon,
    description: modules.emergencyPlansProcedures,
  },
  {
    name: 'Disseminations',
    path: '/disseminations',
    icon: disseminationIcon,
    description: modules.emergencyPlansDisseminations,
    disabled: true,
  },
  {
    name: 'Activations',
    path: '/activations',
    icon: activationIcon,
    description: modules.emergencyPlansActivations,
    disabled: true,
  },
  {
    name: 'Drills & Exercises',
    path: '/drills',
    icon: drillsAndExercisesIcon,
    description: modules.emergencyPlansDrillsExercises,
    disabled: true,
  },
];

/**
 * @function
 * @name EmergencyPlans
 * @description Emergency Plans Home page component allow navigation to emergency
 * plans modules
 *
 * @param {object} props props object
 * @param {object} props.match match object inserted by react router
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
