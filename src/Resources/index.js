import PropTypes from 'prop-types';
import React from 'react';
import adjustmentsIcon from '../assets/images/adjustments.svg';
import itemsIcon from '../assets/images/items.svg';
import stockIcon from '../assets/images/stock.svg';
import utilizationIcon from '../assets/images/utilization.svg';
import warehousesIcon from '../assets/images/warehouses.svg';
import NavigationMenu from '../components/NavigationMenu';

const routes = [
  { name: 'Adjustments', path: '/adjustments', icon: adjustmentsIcon },
  { name: 'Items', path: '/items', icon: itemsIcon },
  { name: 'Stock', path: '/stock', icon: stockIcon },
  {
    name: 'Utilization/Consumptions',
    path: '/utilization',
    icon: utilizationIcon,
  },
  { name: 'Warehouses', path: '/warehouses', icon: warehousesIcon },
];

/**
 * Resources component which allow navigation to resource sub modules
 *
 * @function
 * @name Resources
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Resources = ({ match }) => (
  <NavigationMenu routes={routes} match={match} />
);

/* props validation */
Resources.propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

export default Resources;
