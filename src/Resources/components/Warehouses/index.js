import {
  Connect,
  getWarehouses,
  openWarehouseForm,
  selectWarehouse,
  closeWarehouseForm,
  searchWarehouses,
} from '@codetanzania/emis-api-states';
import { Input, Modal, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import WarehouseList from './List';
import WarehouseForm from './Form';
import WarehouseFilters from './Filters';
import WarehousesActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * @class
 * @name Warehouses
 * @description Render warehouses module which has search box,
 *  actions and list of warehouses
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Warehouses extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    showForm: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    warehouses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        level: PropTypes.string,
      })
    ).isRequired,
    warehouse: PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
    }),
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  static defaultProps = {
    warehouse: null,
  };

  componentWillMount() {
    getWarehouses();
  }

  /**
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible
   * property to false via state
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
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible
   * property to false via state
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
   * @function
   * @name openForm
   * @description Open warehouse form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openWarehouseForm();
  };

  /**
   * @function
   * @name closeForm
   * @description close warehouse form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeForm = () => {
    closeWarehouseForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchWarehouses
   * @description Search Warehouses List based on supplied filter word
   *
   * @param {Object} event  Event instance
   * @returns {undefined}  Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  search = event => {
    searchWarehouses({ q: event.target.value });
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {Object} warehouse warehouse to be deleted
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = warehouse => {
    selectWarehouse(warehouse);
    this.setState({ isEditForm: true });
    openWarehouseForm();
  };

  /**
   * @function
   * @name handleAfterCloseForm
   * @description Handle on actions after closing form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      warehouses,
      loading,
      total,
      page,
      posting,
      showForm,
      warehouse,
    } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="WarehouseList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for warehouses here ..."
              onChange={this.search}
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
              onClick={this.openForm}
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
        <WarehouseList
          warehouses={warehouses}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Warehouses"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          maskClosable={false}
          footer={null}
          width={800}
        >
          <WarehouseFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Warehouse' : 'Add New Warehouse'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <WarehouseForm
            posting={posting}
            isEditForm={isEditForm}
            warehouse={warehouse}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Warehouses, {
  warehouses: 'warehouses.list',
  warehouse: 'warehouses.selected',
  posting: 'warehouses.posting',
  showForm: 'warehouses.showForm',
  loading: 'warehouses.loading',
  page: 'warehouses.page',
  total: 'warehouses.total',
});
