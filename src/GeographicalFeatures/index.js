import PropTypes from 'prop-types';
import React from 'react';
// import administrativeBoundariesIcon from '../assets/images/administrativeboundaries.svg';
import facilitiesIcon from '../assets/images/facilities.svg';
import infrastructureIcon from '../assets/images/infrastructure.svg';
import warehousesIcon from '../assets/images/warehouses.svg';
import districtIcon from '../assets/images/district.svg';
import wardIcon from '../assets/images/ward.svg';
import subwardIcon from '../assets/images/subward.svg';
import EvacuationIcon from '../assets/images/evacuationCenter.svg';

import NavigationMenu from '../components/NavigationMenu';

const routes = [
  // {
  //   name: 'Administrative Boundaries',
  //   path: '/administrativeboundaries',
  //   icon: administrativeBoundariesIcon,
  // },
  {
    name: 'Districts',
    path: '/districts',
    icon: districtIcon,
  },
  {
    name: 'Wards',
    path: '/wards',
    icon: wardIcon,
  },
  {
    name: 'Subwards',
    path: '/subwards',
    icon: subwardIcon,
  },
  {
    name: 'Evacuation Centers',
    path: '/evacuationcenters',
    icon: EvacuationIcon,
  },

  { name: 'Facilities', path: '/facilities', icon: facilitiesIcon },

  { name: 'Warehouses', path: '/warehouses', icon: warehousesIcon },
  {
    name: 'Critical Infrastructure',
    path: '/infrastructure',
    icon: infrastructureIcon,
  },
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
