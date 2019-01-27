import PropTypes from 'prop-types';
import React from 'react';
import questionsIcon from '../assets/images/questions.svg';
import questionnairesIcon from '../assets/images/questionnaires.svg';
import incidentIcon from '../assets/images/incidents.svg';
import indicatorIcon from '../assets/images/indicators.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Indicators', path: '/indicators', icon: indicatorIcon },
  {
    name: 'Observations / Response',
    path: '/responses',
    icon: incidentIcon,
  },
  { name: 'Questionnaires', path: '/questionnaires', icon: questionnairesIcon },
  { name: 'Questions', path: '/questions', icon: questionsIcon },
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
