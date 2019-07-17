import PropTypes from 'prop-types';
import React from 'react';
import agenciesIcon from '../assets/icons/stakeholders/agency.svg';
import contactsIcon from '../assets/icons/stakeholders/contacts.svg';
import notificationsIcon from '../assets/icons/stakeholders/notifications.svg';
import rolesIcon from '../assets/icons/stakeholders/roles.svg';
import NavigationMenu from '../components/NavigationMenu';
import modules from '../modules.json';

/* constants */
const routes = [
  {
    name: 'Focal People',
    path: '/focalpeople',
    icon: contactsIcon,
    description: modules.stakeholdersFocalPeople,
  },
  {
    name: 'Agencies',
    path: '/agencies',
    icon: agenciesIcon,
    description: modules.stakeholdersAgencies,
  },
  {
    name: 'Roles',
    path: '/roles',
    icon: rolesIcon,
    description: modules.stakeholdersRoles,
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: notificationsIcon,
    description: modules.stakeholdersNotifications,
  },
];

/**
 * @function
 * @name Stakeholders
 * @description Stakeholders component which shows to navigation Nav
 *
 * @param {object} props props object
 * @param {object} props.match match router object
 *
 * @returns {object} React element
 * @version 0.1.0
 * @since 0.1.0
 */
const Stakeholders = ({ match }) => (
  <NavigationMenu routes={routes} match={match} />
);

/* props validation */
Stakeholders.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

export default Stakeholders;
