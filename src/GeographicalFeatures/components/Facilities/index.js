import {
  Connect,
  getFeatures,
  openFeatureForm,
  selectFeature,
  closeFeatureForm,
  searchFeatures,
} from '@codetanzania/emis-api-states';
import { Input, Modal, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FacilityList from './List';
import FacilityForm from './Form';
import FacilitiesFilters from './Filters';
import FacilitiesActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 *
 * @class
 * @name Facilities
 * @description Render Facility module which has search box,
 * actions and list of Facilities
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Facilities extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    getFeatures();
  }

  /**
   *
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property
   *  to false via state
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
   *
   * @function
   * @name openForm
   * @description Open Facility form
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
   * @description close Facility form
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
   * @description Search Facility List based on supplied filter word
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
   * @param {object} facility facility object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = facility => {
    selectFeature(facility);
    this.setState({ isEditForm: true });
    openFeatureForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      facilities,
      loading,
      total,
      page,
      posting,
      showForm,
      facility,
    } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="Facilities">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for Facilities here ..."
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
              title="Add New Facility"
              onClick={this.openForm}
            >
              New Facility
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <FacilitiesActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}
        {/* list starts */}
        <FacilityList
          facilities={facilities}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Facilities"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          destroyOnClose
          maskClosable={false}
          footer={null}
          width={800}
        >
          <FacilitiesFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Facility' : 'Add New Facility'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <FacilityForm
            posting={posting}
            isEditForm={isEditForm}
            facility={facility}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

Facilities.propTypes = {
  loading: PropTypes.bool.isRequired,
  showForm: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  facilities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
  facility: PropTypes.shape({
    name: PropTypes.string,
    level: PropTypes.string,
  }),
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

Facilities.defaultProps = {
  facility: null,
};

export default Connect(Facilities, {
  facilities: 'features.list',
  facility: 'features.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
