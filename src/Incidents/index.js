import PropTypes from 'prop-types';
import React from 'react';
import commandCenterIcon from '../assets/icons/incidents/incidentcommandcenter.svg';
import assessmentIcon from '../assets/icons/incidents/assessments.svg';
import incidentTypeIcon from '../assets/icons/incidents/incidenttype.svg';
import lossDatabaseIcon from '../assets/icons/incidents/lossdatabase.svg';
import feedIcon from '../assets/icons/incidents/feed.svg';
import actionsIcon from '../assets/icons/incidents/actions.svg';
import NavigationMenu from '../components/NavigationMenu';
import modules from '../modules.json';

const routes = [
  {
    name: 'Incident Command Center',
    path: '/commandcenter',
    icon: commandCenterIcon,
    description: modules.incidentsCommandCenter,
  },
  {
    name: 'Incidents Actions',
    path: '/actions',
    icon: actionsIcon,
    description: modules.incidentsActions,
  },
  {
    name: 'Assessments',
    path: '/assessments',
    icon: assessmentIcon,
    description: modules.incidentsAssessments,
  },
  {
    name: 'Incidents Feeds',
    path: '/feeds',
    icon: feedIcon,
    description: modules.incidentsFeeds,
  },
  {
    name: 'Incident Types',
    path: '/incidenttypes',
    icon: incidentTypeIcon,
    description: modules.incidentsTypes,
  },
  {
    name: 'Loss Database/History',
    path: '/lossdatabase',
    icon: lossDatabaseIcon,
    description: modules.incidentsLossDatabase,
  },
];
/**
 *
 * @function
 * @name Incidents
 * @description Home component which shows to navigation Nav
 *
 * @param {Object} props props object
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Incidents = ({ match }) => (
  <NavigationMenu routes={routes} match={match} />
);

/* props validation */
Incidents.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

export default Incidents;
