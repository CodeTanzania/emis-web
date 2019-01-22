import PropTypes from 'prop-types';
import React from 'react';
import alertIcon from '../assets/images/alerts.svg';
import assessmentIcon from '../assets/images/assessments.svg';
import incidentIcon from '../assets/images/incidents.svg';
import planIcon from '../assets/images/plans.svg';
import resourceIcon from '../assets/images/resources.svg';
import stakeholderIcon from '../assets/images/stakeholders.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Incident Command Center', path: '/commandcenter', icon: alertIcon },
  { name: 'Assessments', path: '/assessments', icon: assessmentIcon },
  { name: 'Loss Database/History', path: '/lossdatabase', icon: planIcon },
  { name: 'Incident Types', path: '/incidenttypes', icon: incidentIcon },
  { name: 'Feeds', path: '/feeds', icon: resourceIcon },
  { name: 'Actions', path: '/actions', icon: stakeholderIcon },
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
