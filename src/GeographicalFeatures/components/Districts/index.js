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
 *
 * @class
 * @name Districts
 * @description Render districts list which have search box,
 *  actions and districts list
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
   *
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property to
   *  false via state
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
   * @name searchDistrict
   * @description Search Districts List based on supplied filter word
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
   *
   * @function
   * @name openContactForm
   * @description Open district form
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
   * @description close district form
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
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {Object} district object passed to the function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = district => {
    selectFeature(district);
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
