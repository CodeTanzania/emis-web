import PropTypes from 'prop-types';
import React from 'react';
import commandCenterIcon from '../assets/images/commandCentre.svg';
import assessmentIcon from '../assets/images/assessments.svg';
import incidentTypeIcon from '../assets/images/incidentsType.svg';
import lossDatabaseIcon from '../assets/images/lossDatabase.svg';
import feedIcon from '../assets/images/feed.svg';
import actionsIcon from '../assets/images/actions.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  {
    name: 'Incident Command Center',
    path: '/commandcenter',
    icon: commandCenterIcon,
  },
  { name: 'Actions', path: '/actions', icon: actionsIcon },
  { name: 'Assessments', path: '/assessments', icon: assessmentIcon },
  { name: 'Feeds', path: '/feeds', icon: feedIcon },
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
