import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import StocksListHeader from '../ListHeader';
import StockListItem from '../ListItem';

const StockList = ({ stocks, loading, onEdit }) => (
  <Fragment>
    <StocksListHeader />
    <List
      loading={loading}
      dataSource={stocks}
      renderItem={stock => {
        const { item, store, owner } = stock;
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
