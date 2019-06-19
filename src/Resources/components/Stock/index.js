import {
  closeStockForm,
  Connect,
  getStocks,
  openStockForm,
  openAdjustmentForm,
  closeAdjustmentForm,
  searchStocks,
  selectStock,
} from '@codetanzania/emis-api-states';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Topbar from '../../../components/Topbar';
import StockForm from './Form';
import AdjustmentForm from './AdjustmentForm';
import StockList from './List';
import './styles.css';

/**
 * @class
 * @name Stocks
 * @description Render stock module which have search box,
 * actions and stock list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Stocks extends Component {
  state = {
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    postingAdjustment: PropTypes.bool.isRequired,
    stocks: PropTypes.arrayOf(
      PropTypes.shape({
        stock: PropTypes.object,
        item: PropTypes.object,
        quantity: PropTypes.number,
        _id: PropTypes.string,
      })
    ).isRequired,
    stock: PropTypes.shape({
      stock: PropTypes.object,
      item: PropTypes.object,
      quantity: PropTypes.number,
      _id: PropTypes.string,
    }),
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    showAdjustmentForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    stock: null,
  };

  componentDidMount() {
    getStocks();
  }

  /**
   * @function
   * @name openStockForm
   * @description  Open Stock form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openStockForm = () => {
    openStockForm();
  };

  /**
   * @function
   * @name openStockForm
   * @description close Stock form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeStockForm = () => {
    closeStockForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name openAdjustmentForm
   * @description Open adjustment form
   *
   * @version 0.1.0
   * @since 0.1.0
   *
   */
  openAdjustmentForm = () => {
    openAdjustmentForm();
  };

  /**
   * @function
   * @name closeAdjustmentForm
   * @description close adjustment form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeAdjustmentForm = () => {
    closeAdjustmentForm();
  };

  /**
   * @function
   * @name searchStocks
   * @description Search Stocks List based on supplied filter word
   *
   * @param {object} event Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchStocks = event => {
    searchStocks(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} stock stock to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = stock => {
    selectStock(stock);
    this.setState({ isEditForm: true });
    openStockForm();
  };

  /**
   * @function
   * @name handleAdjustment
   * @description Handle on adjustment action for list item
   *
   * @param {object} stock stock to be adjusted
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAdjustment = stock => {
    selectStock(stock);
    openAdjustmentForm();
  };

  /**
   * @function
   * @name handleAfterCloseForm
   * @description Perform post close form cleanups
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      stocks,
      stock,
      loading,
      posting,
      postingAdjustment,
      page,
      showForm,
      showAdjustmentForm,
      total,
    } = this.props;
    const { isEditForm } = this.state;

    return (
      <Fragment>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for stocks here...',
            onChange: this.searchStocks,
          }}
          actions={[
            {
              label: 'Add New Stock',
              icon: 'plus',
              size: 'large',
              title: 'Add New Stock',
              onClick: this.openStockForm,
            },
          ]}
        />
        {/* Topbar */}

        <div className="Stocks">
          {/* list starts */}
          <StockList
            stocks={stocks}
            loading={loading}
            total={total}
            page={page}
            onEdit={this.handleEdit}
            onAdjust={this.handleAdjustment}
          />
          {/* end list */}

          {/* create/edit form modal */}
          <Modal
            title={isEditForm ? 'Edit Stock' : 'Add New Stock'}
            visible={showForm}
            footer={null}
            destroyOnClose
            maskClosable={false}
            onCancel={this.closeStockForm}
            afterClose={this.handleAfterCloseForm}
          >
            <StockForm
              posting={posting}
              isEditForm={isEditForm}
              stock={stock}
              onCancel={this.closeStockForm}
            />
          </Modal>
          {/* end create/edit form modal */}

          <Modal
            title={`Adjust ${stock ? stock.item.name : 'Stock'}`}
            visible={showAdjustmentForm}
            footer={null}
            maskClosable={false}
            onCancel={this.closeAdjustmentForm}
          >
            <AdjustmentForm
              posting={postingAdjustment}
              onCancel={this.closeAdjustmentForm}
            />
          </Modal>
        </div>
      </Fragment>
    );
  }
}

export default Connect(Stocks, {
  stocks: 'stocks.list',
  stock: 'stocks.selected',
  loading: 'stocks.loading',
  posting: 'stocks.posting',
  page: 'stocks.page',
  showForm: 'stocks.showForm',
  total: 'stocks.total',
  showAdjustmentForm: 'adjustments.showForm',
  postingAdjustment: 'adjustments.posting',
});
