import PropTypes from 'prop-types';
import React from 'react';
import commandCenterIcon from '../assets/icons/incidents/incidentcommandcenter-disabled.svg';
import assessmentIcon from '../assets/icons/incidents/assessments.svg';
import incidentTypeIcon from '../assets/icons/incidents/incidenttype.svg';
import lossDatabaseIcon from '../assets/icons/incidents/lossdatabase.svg';
import feedIcon from '../assets/icons/incidents/feed.svg';
import actionsIcon from '../assets/icons/incidents/actions.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  {
    name: 'Incident Command Center',
    path: '/commandcenter',
    icon: commandCenterIcon,
  },
  { name: 'Incidents Actions', path: '/actions', icon: actionsIcon },
  { name: 'Assessments', path: '/assessments', icon: assessmentIcon },
  { name: 'Incidents Feeds', path: '/feeds', icon: feedIcon },
  { name: 'Incident Types', path: '/incidenttypes', icon: incidentTypeIcon },
  {
    name: 'Loss Database/History',
    path: '/lossdatabase',
    icon: lossDatabaseIcon,
  },
];
/**
 * Home component which shows to navigation Nav
 *
 * @function
 * @name Incidents
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
