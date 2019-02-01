import PropTypes from 'prop-types';
import React from 'react';
import administrativeBoundariesIcon from '../assets/icons/geographicalfeatures/administrativeboundaries.svg';
import facilitiesIcon from '../assets/icons/geographicalfeatures/facilities.svg';
import infrastructureIcon from '../assets/icons/geographicalfeatures/infrastructures.svg';
import warehousesIcon from '../assets/icons/geographicalfeatures/warehouse.svg';
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
