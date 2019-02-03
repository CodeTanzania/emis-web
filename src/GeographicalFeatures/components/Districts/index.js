import {
  Connect,
  filterFeatures,
  searchFeatures,
  closeFeatureForm,
  openFeatureForm,
  selectFeature,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DistrictsActionBar from './ActionBar';
import DistrictsList from './List';
import DistrictsFilters from './Filters';
import DistrictForm from './Form';
import './styles.css';

const { Search } = Input;

/**
 * Render districts list which have search box, actions and districts list
 *
 * @class
 * @name Districts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Districts extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    districts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    district: PropTypes.shape({ name: PropTypes.string }),
    showForm: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    district: null,
  };

  componentDidMount() {
    filterFeatures({ type: 'District', family: 'Administrative' });
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
   * Search Districts List based on supplied filter word
   *
   * @function
   * @name searchDistrict
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchDistricts = event => {
    searchFeatures(event.target.value);
  };

  /**
   * Open district form
   *
   * @function
   * @name openContactForm
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
   * close district form
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
  handleEdit = region => {
    selectFeature(region);
    this.setState({ isEditForm: true });
    openFeatureForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      page,
      total,
      districts,
      loading,
      posting,
      showForm,
      district,
    } = this.props;
    const { showFilters, isEditForm } = this.state;

    return (
      <div className="Districts">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for districts here ..."
              onChange={this.searchDistricts}
            />
            {/* end search input component */}
          </Col>

          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New District"
              onClick={this.openForm}
            >
              New District
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <DistrictsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}

        {/* list starts */}
        <DistrictsList
          districts={districts}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Districts"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          width={630}
          maskClosable={false}
        >
          <DistrictsFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit District' : 'Add New District'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <DistrictForm
            posting={posting}
            isEditForm={isEditForm}
            district={district}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Districts, {
  districts: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
  district: 'features.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
});
