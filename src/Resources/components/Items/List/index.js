import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ItemsListItem from '../ListItem';
import ItemsListHeader from '../ListHeader';

const ItemsList = ({ items, loading }) => (
  <Fragment>
    <ItemsListHeader />
    <List
      loading={loading}
      dataSource={items}
      renderItem={item => (
        <ItemsListItem
          key={item.name}
          name={item.name}
          type={item.type}
          maxStockAllowed={item.maxStockAllowed}
          minStockAllowed={item.minStockAllowed}
          description={item.description}
          color={item.color}
        />
      )}
    />
  </Fragment>
);

ItemsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default ItemsList;
