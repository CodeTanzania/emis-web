import PropTypes from 'prop-types';
import React from 'react';
import issuedAlertsIcon from '../assets/icons/alerts/issuedalerts.svg';
import actionsIcon from '../assets/icons/alerts/actions-disabled.svg';
import surveyAndFeedbackIcon from '../assets/icons/alerts/surveyandfeedback-disabled.svg';
import serviceRequestsIcon from '../assets/icons/alerts/servicerequest-disabled.svg';
import feedsIcon from '../assets/icons/alerts/feeds-disabled.svg';
import sourceIcon from '../assets/icons/alerts/sources.svg';
import NavigationMenu from '../components/NavigationMenu';
import modules from '../modules.json';

const routes = [
  {
    name: 'Issued Alerts',
    path: '/alerts',
    icon: issuedAlertsIcon,
    description: modules.alertsIssued,
  },
  {
    name: 'Actions Taken',
    path: '/actions',
    icon: actionsIcon,
    description: modules.alertsActions,
    disabled: true,
  },
  {
    name: 'Alerts Feed',
    path: '/feeds',
    icon: feedsIcon,
    description: modules.alertsFeeds,
    disabled: true,
  },
  {
    name: 'Surveys & Feedbacks',
    path: '/feedback',
    icon: surveyAndFeedbackIcon,
    description: modules.alertsAssessments,
    disabled: true,
  },
  {
    name: 'Alert Sources',
    path: '/sources',
    icon: sourceIcon,
    description: modules.alertsSources,
  },
  {
    name: 'Service Requests',
    path: '/servicerequests',
    icon: serviceRequestsIcon,
    description: modules.alertsServiceRequests,
    disabled: true,
  },
];

/**
 * @function
 * @name Alerts
 * @description Alerts component which shows to navigation Nav
 *
 * @param {Object} match object with routes information
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
