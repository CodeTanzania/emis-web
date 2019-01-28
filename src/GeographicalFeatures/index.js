import PropTypes from 'prop-types';
import React from 'react';
import administrativeBoundariesIcon from '../assets/images/administrativeboundaries.svg';
import facilitiesIcon from '../assets/images/facilities.svg';
import infrastructureIcon from '../assets/images/infrastructure.svg';
import warehousesIcon from '../assets/images/warehouses.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  {
    name: 'Administrative Boundaries',
    path: '/administrativeboundaries',
    icon: administrativeBoundariesIcon,
  },
  {
    name: 'Critical Infrastructure',
    path: '/infrastructure',
    icon: infrastructureIcon,
  },
  { name: 'Facilities', path: '/facilities', icon: facilitiesIcon },
  {
    name: 'Evacuation Centers',
    path: '/evacuationcenters',
    icon: facilitiesIcon,
  },
  { name: 'Warehouses', path: '/warehouses', icon: warehousesIcon },
];

/**
 * Home component which shows to navigation Nav
 *
 * @function
 * @name GeographicalFeatures
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const GeographicalFeatures = ({ match }) => (
  <NavigationMenu routes={routes} match={match} />
);

/* props validation */
GeographicalFeatures.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

export default GeographicalFeatures;
