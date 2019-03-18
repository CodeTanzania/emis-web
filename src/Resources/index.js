import PropTypes from 'prop-types';
import React from 'react';
import adjustmentsIcon from '../assets/icons/resources/adjustment.svg';
import itemsIcon from '../assets/icons/resources/item.svg';
import itemCategoriesIcon from '../assets/icons/resources/itemcategory.svg';
import stockIcon from '../assets/icons/resources/stock.svg';
import utilizationIcon from '../assets/icons/resources/utilization-disabled.svg';
import warehousesIcon from '../assets/icons/resources/warehouse.svg';
import NavigationMenu from '../components/NavigationMenu';
import modules from '../modules.json';

const routes = [
  {
    name: 'Adjustments',
    path: '/adjustments',
    icon: adjustmentsIcon,
    description: modules.resourcesAdjustments,
  },
  {
    name: 'Items',
    path: '/items',
    icon: itemsIcon,
    description: modules.resourcesItems,
  },
  {
    name: 'Item Categories',
    path: '/item-categories',
    icon: itemCategoriesIcon,
  },
  {
    name: 'Stocks',
    path: '/stocks',
    icon: stockIcon,
    description: modules.resourcesStocks,
  },
  {
    name: 'Utilization/Consumptions',
    path: '/utilization',
    icon: utilizationIcon,
    description: modules.resourcesConsumption,
    disabled: true,
  },
  {
    name: 'Warehouses',
    path: '/warehouses',
    icon: warehousesIcon,
    description: modules.resourcesWarehouses,
  },
];

/**
 * @function
 * @name Resources
 * @description Resources component which allow navigation
 *  to resource sub modules
 *
 * @param {Object} props props object
 * @param {Object} props.match route params
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
