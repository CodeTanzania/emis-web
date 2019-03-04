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
import EvacuationCenterList from './List';
import EvacuationCenterForm from './Form';
import EvacuationCenterFilters from './Filters';
import EvacuationCentersActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 *
 * @class
 * @name EvacuationCenters
 * @description Render features module which has search box,
 * actions and list of features
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class EvacuationCenters extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    showForm: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    evacuationCenters: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
      })
    ).isRequired,
    evacuationCenter: PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
    }),
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  static defaultProps = {
    evacuationCenter: null,
  };

  componentWillMount() {
    getFeatures();
  }

  /**
   *
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property to
   * false via state
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
   * @description Open Evacuation Center form
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
   * @description close Evacuation Center form
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
   * @description Search Evacuation Centers List based on supplied filter word
   *
   * @param {Object} event - Event instance
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
   * @param {Object} evacuationCenter evacuation center object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = evacuationCenter => {
    selectFeature(evacuationCenter);
    this.setState({ isEditForm: true });
    openFeatureForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      evacuationCenters,
      loading,
      total,
      page,
      posting,
      showForm,
      evacuationCenter,
    } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="EvacuationCenterList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for Evacuation Centers here ..."
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
              title="Add New Evacuation Center"
              onClick={this.openForm}
            >
              New Evacuation Center
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <EvacuationCentersActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}
        {/* list starts */}
        <EvacuationCenterList
          evacuationCenters={evacuationCenters}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Evacuation Centers"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          destroyOnClose
          maskClosable={false}
          footer={null}
          width={800}
        >
          <EvacuationCenterFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={
            isEditForm ? 'Edit Evacuation Center' : 'Add New Evacuation Center'
          }
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <EvacuationCenterForm
            posting={posting}
            isEditForm={isEditForm}
            evacuationCenter={evacuationCenter}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(EvacuationCenters, {
  evacuationCenters: 'features.list',
  evacuationCenter: 'features.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
