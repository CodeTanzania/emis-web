import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import StocksListHeader from '../ListHeader';
import StockListItem from '../ListItem';

/**
 * @function
 * @name StockList
 * @description Render stock list which has search box and actions
 *
 * @param {Object} props props object
 * @param {string} props.stocks array of stocks objects
 * @param {boolean} props.loading represents loading status
 * @param {Function} props.onEdit call back function  called
 * during editing a stock
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const StockList = ({ stocks, loading, onEdit }) => (
  <Fragment>
    <StocksListHeader />
    <List
      loading={loading}
      dataSource={stocks}
      renderItem={stock => {
        const { item, store } = stock;
        const { owner } = stock.owner ? stock : { owner: { name: 'N/A' } };
        return (
          <StockListItem
            key={stock.name}
            itemName={item.name}
            warehouseName={store.name}
            owner={owner.name}
            color={item.color}
            uom={item.uom}
            quantity={stock.quantity}
            onEdit={() => onEdit(stock)}
          />
        );
      }}
    />
  </Fragment>
);

StockList.propTypes = {
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      stock: PropTypes.object,
      item: PropTypes.object,
      quantity: PropTypes.number,
      _id: PropTypes.string,
    })
  ).isRequired,
};

export default StockList;
