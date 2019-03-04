import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ItemsListItem from '../ListItem';
import ItemsListHeader from '../ListHeader';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name ItemsList
 * @description list item component.
 * Render item details
 *
 * @param {Object} props props object
 * @param {Array} props.items array of items
 * @param {string} props.loading loading status
 * @param {Function} props.onEdit call back function
 *  when edit is performed
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ItemsList = ({ items, loading, onEdit }) => (
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
          onEdit={() => onEdit(item)}
        />
      )}
    />
  </Fragment>
);

ItemsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ItemsList;
