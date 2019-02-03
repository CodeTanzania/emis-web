import {
  Connect,
  searchFeatures,
  filterFeatures,
  openFeatureForm,
  closeFeatureForm,
  selectFeature,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import WardsActionBar from './ActionBar';
import WardsList from './List';
import WardsFilters from './FIlters';
import WardForm from './Form';
import './styles.css';

const { Search } = Input;

/**
 * Render Wards list which have search box, actions and Wards list
 *
 * @class
 * @name Wards
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Wards extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    wards: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    posting: PropTypes.bool.isRequired,
    ward: PropTypes.shape({ name: PropTypes.string }),
    showForm: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    ward: null,
  };

  componentDidMount() {
    filterFeatures({ type: 'Ward', family: 'Administrative' });
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
   * Search wards List based on supplied filter word
   *
   * @function
   * @name searchWards
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchWards = event => {
    searchFeatures(event.target.value);
  };

  /**
   * Open ward form
   *
   * @function
   * @name openForm
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
   * close ward form
   *
   * @function
   * @name closeForm
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
   * Handle on Edit action for list item
   *
   * @function
   * @name handleEdit
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = ward => {
    selectFeature(ward);
    this.setState({ isEditForm: true });
    openFeatureForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const { page, total, wards, loading, posting, showForm, ward } = this.props;
    const { showFilters, isEditForm } = this.state;

    return (
      <div className="Wards">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for wards here ..."
              onChange={this.searchWards}
            />
            {/* end search input component */}
          </Col>

          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Ward"
              onClick={this.openForm}
            >
              New Ward
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <WardsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}

        {/* list starts */}
        <WardsList wards={wards} loading={loading} onEdit={this.handleEdit} />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Wards"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          width={800}
          destroyOnClose
          maskClosable={false}
        >
          <WardsFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Ward' : 'Add New Ward'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <WardForm
            posting={posting}
            isEditForm={isEditForm}
            ward={ward}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Wards, {
  wards: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
  ward: 'features.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
});
