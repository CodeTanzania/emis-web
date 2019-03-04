import PropTypes from 'prop-types';
import React from 'react';
import regionIcon from '../assets/icons/region.svg';
import districtIcon from '../assets/icons/district.svg';
import wardIcon from '../assets/icons/ward.svg';
import subwardIcon from '../assets/icons/subward.svg';
import EvacuationIcon from '../assets/icons/evacuationCenter.svg';
import facilitiesIcon from '../assets/icons/geographicalfeatures/facilities.svg';
import infrastructureIcon from '../assets/icons/geographicalfeatures/infrastructures.svg';
import warehousesIcon from '../assets/icons/geographicalfeatures/warehouse.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  {
    name: 'Regions',
    path: '/regions',
    icon: regionIcon,
  },
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
 *
 * @function
 * @name GeographicalFeatures
 * @description Home component which shows to navigation Nav
 *
 * @param {Object} props props object
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
