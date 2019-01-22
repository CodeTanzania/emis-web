import PropTypes from 'prop-types';
import React from 'react';
import contactsIcon from '../assets/images/contacts.svg';
import notificationsIcon from '../assets/images/notifications.svg';
import rolesIcon from '../assets/images/roles.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Contacts', path: '/contacts', icon: contactsIcon },
  {
    name: 'Roles & Responsibilities',
    path: '/roles',
    icon: rolesIcon,
  },
  { name: 'Notifications', path: '/notifications', icon: notificationsIcon },
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
