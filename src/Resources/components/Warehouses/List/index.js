import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import WarehouseListHeader from '../ListHeader';
import WarehouseListItem from '../ListItem';

/**
 * Render warehouse list which have search box and actions
 *
 * @class
 * @name WarehouseList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const WarehouseList = ({ warehouses, loading }) => (
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
        />
      )}
    />
  </Fragment>
);

WarehouseList.propTypes = {
  loading: PropTypes.bool.isRequired,
  warehouses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
    })
  ).isRequired,
};

export default WarehouseList;
