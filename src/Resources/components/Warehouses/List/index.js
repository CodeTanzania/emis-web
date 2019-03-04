import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import WarehouseListHeader from '../ListHeader';
import WarehouseListItem from '../ListItem';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @class
 * @name WarehouseList
 * @description Render warehouse list which have search box and actions
 *
 * @param {Object} props props object
 * @param {Array} props.warehouses array of warehouses
 * @param {boolean} props.loading represents loading status
 * @param {Function} props.onEdit call back function called
 * during editing a stock
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const WarehouseList = ({ warehouses, loading, onEdit }) => (
  <Fragment>
    <WarehouseListHeader />
    <List
      loading={loading}
      dataSource={warehouses}
      renderItem={warehouse => (
        <WarehouseListItem
          key={warehouse.name}
          name={warehouse.name}
          level={warehouse.level}
          onEdit={() => onEdit(warehouse)}
        />
      )}
    />
  </Fragment>
);

WarehouseList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  warehouses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
    })
  ).isRequired,
};

export default WarehouseList;
