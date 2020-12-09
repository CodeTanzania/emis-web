import {
  Connect,
  filterFeatures,
  openFeatureForm,
  selectFeature,
  closeFeatureForm,
  searchFeatures,
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
 *
 * @class
 * @name Warehouses
 * @description Render features module which has search box, actions and
 *  list of features
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Warehouses extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    filterFeatures({ family: 'Warehouse' });
  }

  /**
   *
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property to
   * false via state
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
   *
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible property to
   * false via state
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
   *
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
    openFeatureForm();
  };

  /**
   *
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
    closeFeatureForm();
    this.setState({ isEditForm: false });
  };

  /**
   *
   * @function
   * @name searchFeatures
   * @description Search Warehouses List based on supplied filter word
   *
   * @param {object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  search = event => {
    searchFeatures({ q: event.target.value });
  };

  /**
   *
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} warehouse warehouse object passed in the function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = warehouse => {
    selectFeature(warehouse);
    this.setState({ isEditForm: true });
    openFeatureForm();
  };

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
          destroyOnCloseName
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

Warehouses.propTypes = {
  loading: PropTypes.bool.isRequired,
  showForm: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  warehouses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
  warehouse: PropTypes.shape({
    name: PropTypes.string,
    level: PropTypes.string,
  }),
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

Warehouses.defaultProps = {
  warehouse: null,
};

export default Connect(Warehouses, {
  warehouses: 'features.list',
  warehouse: 'features.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
