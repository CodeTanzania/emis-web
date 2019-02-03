import PropTypes from 'prop-types';
import React from 'react';
import issuedAlertsIcon from '../assets/icons/alerts/issuedalerts.svg';
import actionsIcon from '../assets/icons/alerts/actions-disabled.svg';
import surveyAndFeedbackIcon from '../assets/icons/alerts/surveyandfeedback-disabled.svg';
import serviceRequestsIcon from '../assets/icons/alerts/servicerequest-disabled.svg';
import feedsIcon from '../assets/icons/alerts/feeds-disabled.svg';
import sourceIcon from '../assets/icons/alerts/sources.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Issued Alerts', path: '/alerts', icon: issuedAlertsIcon },
  {
    name: 'Actions Taken',
    path: '/actions',
    icon: actionsIcon,
    disabled: true,
  },
  { name: 'Alerts Feed', path: '/feeds', icon: feedsIcon, disabled: true },
  {
    name: 'Surveys & Feedbacks',
    path: '/feedback',
    icon: surveyAndFeedbackIcon,
    disabled: true,
  },
  { name: 'Alert Sources', path: '/sources', icon: sourceIcon },
  {
    name: 'Service Requests',
    path: '/servicerequests',
    icon: serviceRequestsIcon,
    disabled: true,
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
