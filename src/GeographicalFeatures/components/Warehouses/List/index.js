import { List } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import WarehouseListHeader from '../ListHeader';
import WarehouseListItem from '../ListItem';

/**
 * @function
 * @name WarehouseList
 * @description Render warehouse list which have search box and actions
 *
 * @param {object} props props object
 *
 * @returns {object} React Compnent
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const WarehouseList = ({ warehouses, loading, onEdit }) => (
  <>
    <WarehouseListHeader />
    <List
      loading={loading}
      dataSource={warehouses}
      renderItem={warehouse => (
        <WarehouseListItem
          key={warehouse.name}
          name={warehouse.name}
          level={warehouse.type}
          onEdit={() => onEdit(warehouse)}
        />
      )}
    />
  </>
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
