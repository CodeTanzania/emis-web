import { Connect, getWarehouses } from '@codetanzania/emis-api-states';
import { Input, Modal, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import WarehouseList from './List';
import WarehouseFilters from './Filters';
import WarehousesActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * Render warehouses module which has search box, actions and list of warehouses
 *
 * @class
 * @name Warehouses
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Warehouses extends Component {
  state = {
    showFilters: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    warehouses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        level: PropTypes.string,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getWarehouses();
  }

  /**
   * open filters modal by setting it's visible property to false via state
   *
   * @function
   * @name openFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * Close filters modal by setting it's visible property to false via state
   *
   * @function
   * @name closeFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * Search Warehouses List based on supplied filter word
   *
   * @function
   * @name searchWarehouses
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchWarehouses = event => {
    getWarehouses({ q: event.target.value });
  };

  render() {
    const { warehouses, loading, total, page } = this.props;
    const { showFilters } = this.state;
    return (
      <div className="WarehouseList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for warehouses here ..."
              onChange={getWarehouses}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Warehouse"
            >
              New Warehouse
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <WarehousesActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}
        {/* list starts */}
        <WarehouseList warehouses={warehouses} loading={loading} />
        {/* end list */}
        <Modal
          title="Filter Warehouses"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          width={800}
        >
          <WarehouseFilters onCancel={this.closeFiltersModal} />
        </Modal>
      </div>
    );
  }
}

export default Connect(Warehouses, {
  warehouses: 'warehouses.list',
  loading: 'warehouses.loading',
  page: 'warehouses.page',
  total: 'warehouses.total',
});
