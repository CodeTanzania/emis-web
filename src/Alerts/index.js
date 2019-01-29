import PropTypes from 'prop-types';
import React from 'react';
import issuedAlertsIcon from '../assets/images/issuedalerts.svg';
import actionsIcon from '../assets/images/actions.svg';
import surveyAndFeedbackIcon from '../assets/images/surveyAndFeedback.svg';
import serviceRequestsIcon from '../assets/images/servicerequests.svg';
import feedIcon from '../assets/images/feed.svg';
import sourceIcon from '../assets/images/sources.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Issued Alerts', path: '/alerts', icon: issuedAlertsIcon },
  { name: 'Actions Taken', path: '/actions', icon: actionsIcon },
  { name: 'Alerts Feed', path: '/feeds', icon: feedIcon },
  {
    name: 'Surveys & Feedbacks',
    path: '/feedback',
    icon: surveyAndFeedbackIcon,
  },
  { name: 'Sources', path: '/sources', icon: sourceIcon },
  {
    name: 'Service Requests',
    path: '/servicerequests',
    icon: serviceRequestsIcon,
  },
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
