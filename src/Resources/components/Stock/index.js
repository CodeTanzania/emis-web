import {
  closeStockForm,
  Connect,
  getStocks,
  openStockForm,
  searchStocks,
  selectStock,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StocksActionBar from './ActionBar';
import StockForm from './Form';
import StockList from './List';
import './styles.css';

const { Search } = Input;

/**
 * Render stock module which have search box, actions and stock list
 *
 * @class
 * @name Stocks
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
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    stock: null,
  };

  componentDidMount() {
    getStocks();
  }

  /**
   * Open Stock form
   *
   * @function
   * @name openStockForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openStockForm = () => {
    openStockForm();
  };

  /**
   * close Stock form
   *
   * @function
   * @name openStockForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeStockForm = () => {
    closeStockForm();
    this.setState({ isEditForm: false });
  };

  /**
   * Search Stocks List based on supplied filter word
   *
   * @function
   * @name searchStocks
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchStocks = event => {
    searchStocks(event.target.value);
  };

  /**
   * Handle on Edit action for list item
   *
   * @function
   * @name handleEdit
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = Stock => {
    selectStock(Stock);
    this.setState({ isEditForm: true });
    openStockForm();
  };

  render() {
    const {
      stocks,
      stock,
      loading,
      posting,
      page,
      showForm,
      total,
    } = this.props;
    const { isEditForm } = this.state;
    return (
      <div className="Stocks">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for stocks here ..."
              onChange={this.searchStocks}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Stock"
              onClick={this.openStockForm}
            >
              New Stock
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <StocksActionBar total={total} page={page} />
        {/* end list header */}

        {/* list starts */}
        <StockList stocks={stocks} loading={loading} onEdit={this.handleEdit} />
        {/* end list */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Stock' : 'Add New Stock'}
          visible={showForm}
          footer={null}
          onCancel={this.closeStockForm}
          destroyOnClose
          maskClosable={false}
        >
          <StockForm
            posting={posting}
            isEditForm={isEditForm}
            Stock={stock}
            onCancel={this.closeStockForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Stocks, {
  stocks: 'stocks.list',
  Stock: 'stocks.selected',
  loading: 'stocks.loading',
  posting: 'stocks.posting',
  page: 'stocks.page',
  showForm: 'stocks.showForm',
  total: 'stocks.total',
});
