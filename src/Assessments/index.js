import PropTypes from 'prop-types';
import React from 'react';
import alertIcon from '../assets/images/alerts.svg';
import assessmentIcon from '../assets/images/assessments.svg';
import incidentIcon from '../assets/images/incidents.svg';
import planIcon from '../assets/images/plans.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Questionnaires', path: '/questionnaires', icon: alertIcon },
  { name: 'Questions', path: '/questions', icon: assessmentIcon },
  { name: 'Indicators', path: '/indicators', icon: planIcon },
  {
    name: 'Observations / Response',
    path: '/responses',
    icon: incidentIcon,
  },
];

/**
 * Home component which shows to navigation Nav
 *
 * @function
 * @name Assessments
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Assessments = ({ match }) => (
  <NavigationMenu routes={routes} match={match} />
);

/* props validation */
Assessments.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

export default Assessments;
