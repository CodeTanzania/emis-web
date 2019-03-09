import { paginateStocks, refreshStocks } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import PropTypes from 'prop-types';
import intersectionBy from 'lodash/intersectionBy';
import React, { Fragment, Component } from 'react';
import StockListItem from '../ListItem';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';
import ListHeader from '../../../../components/ListHeader';

/* constants */
const headerLayout = [
  { span: 5, header: 'Stakeholder' },
  { span: 5, header: 'Item' },
  { span: 5, header: 'Quantity (Unit)' },
  { span: 5, header: 'Warehouse' },
];

/**
 * @class
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
class StockList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    stocks: PropTypes.arrayOf(
      PropTypes.shape({
        stock: PropTypes.object,
        item: PropTypes.object,
        quantity: PropTypes.number,
        _id: PropTypes.string,
      })
    ).isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  state = {
    selectedStocks: [],
    selectedPages: [],
  };

  render() {
    const { stocks, loading, page, total, onEdit } = this.props;
    const { selectedStocks, selectedPages } = this.state;
    const selectedStocksCount = intersectionBy(selectedStocks, stocks, '_id')
      .length;

    return (
      <Fragment>
        {/* Toolbar */}
        <Toolbar
          itemName="stock"
          selectedItemsCount={selectedStocksCount}
          page={page}
          total={total}
          onPaginate={nextPage => paginateStocks(nextPage)}
          onRefresh={() =>
            refreshStocks(
              () => {
                notifySuccess('Stocks refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Stocks contact System administrator'
                );
              }
            )
          }
        />
        {/* end Toolbar */}

        {/* stocks list header */}
        <ListHeader
          headerLayout={headerLayout}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end stocks list header */}

        {/* stock list */}
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
        {/* end stock list */}
      </Fragment>
    );
  }
}

export default StockList;
