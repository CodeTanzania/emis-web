import PropTypes from 'prop-types';
import React from 'react';
import contactsIcon from '../assets/icons/stakeholders/contacts.svg';
import notificationsIcon from '../assets/icons/stakeholders/notifications-disabled.svg';
import rolesIcon from '../assets/icons/stakeholders/roles.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Focal Persons', path: '/contacts', icon: contactsIcon },
  {
    name: 'Roles',
    path: '/roles',
    icon: rolesIcon,
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: notificationsIcon,
    disabled: true,
  },
];

/**
 * Stakeholders component which shows to navigation Nav
 *
 * @function
 * @name Stakeholders
 *
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
