import { httpActions } from '@codetanzania/emis-api-client';
import { paginateStocks, refreshStocks } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import PropTypes from 'prop-types';
import concat from 'lodash/concat';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';
import map from 'lodash/map';
import intersectionBy from 'lodash/intersectionBy';
import React, { Fragment, Component } from 'react';
import StockListItem from '../ListItem';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';
import ListHeader from '../../../../components/ListHeader';

/* constants */
const headerLayout = [
  { span: 5, header: 'Owner' },
  { span: 5, header: 'Item' },
  { span: 5, header: 'Quantity (Unit)' },
  { span: 5, header: 'Warehouse' },
];
const { getStocksExportUrl } = httpActions;

/**
 * @class
 * @name StockList
 * @description Render stock list which has search box and actions
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
    onAdjust: PropTypes.func.isRequired,
  };

  state = {
    selectedStocks: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleSelectStock
   * @description Handle selection of a single stock checkbox
   *
   * @param {object} stock selected stock object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectStock = stock => {
    const { selectedStocks } = this.state;
    this.setState({
      selectedStocks: concat([], selectedStocks, stock),
    });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all stocks action for current displayed page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedStocks, selectedPages } = this.state;
    const { stocks, page } = this.props;
    const selectedList = uniqBy([...selectedStocks, ...stocks], '_id');
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedStocks: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectStock
   * @description Handle deselect as single stock checkbox action
   *
   * @param {object} stock deselected stock object
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectStock = stock => {
    const { selectedStocks } = this.state;
    const selectedList = [...selectedStocks];
    remove(selectedList, item => item._id === stock._id); // eslint-disable-line

    this.setState({ selectedStocks: selectedList });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselected bulk action for stocks displayed in a list
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { stocks, page } = this.props;
    const { selectedStocks, selectedPages } = this.state;
    const selectedList = [...selectedStocks];
    const pages = [...selectedPages];

    remove(pages, item => item === page);

    stocks.forEach(stock => {
      remove(selectedList, item => item._id === stock._id); // eslint-disable-line
    });

    this.setState({
      selectedStocks: selectedList,
      selectedPages: pages,
    });
  };

  render() {
    const { stocks, loading, page, total, onEdit, onAdjust } = this.props;
    const { selectedStocks, selectedPages } = this.state;
    const selectedStocksCount = intersectionBy(selectedStocks, stocks, '_id')
      .length;

    return (
      <Fragment>
        {/* Toolbar */}
        <Toolbar
          itemName="stock"
          selectedItemsCount={selectedStocksCount}
          exportUrl={getStocksExportUrl({
            filter: { _id: map(selectedStocks, '_id') },
          })}
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
                  'An Error occurred while refreshing Stocks, please contact System administrator'
                );
              }
            )
          }
        />
        {/* end Toolbar */}

        {/* stocks list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
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
                isSelected={map(selectedStocks, '_id').includes(stock._id)} // eslint-disable-line
                onSelectItem={() => {
                  this.handleSelectStock(stock);
                }}
                onDeselectItem={() => {
                  this.handleDeselectStock(stock);
                }}
                onEdit={() => onEdit(stock)}
                onAdjust={() => onAdjust(stock)}
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
