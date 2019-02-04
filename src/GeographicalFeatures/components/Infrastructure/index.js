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
import CriticalInfrastructerList from './List';
import CriticalInfrastructerForm from './Form';
import CriticalInfrastructerFilters from './Filters';
import CriticalInfrastructersActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * Render Critical Infrastructure module which has search box, actions and list of Critical Infrastructures
 *
 * @class
 * @name CriticalInfrastructers
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class CriticalInfrastructers extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    showForm: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    criticalInfrastructures: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
      })
    ).isRequired,
    criticalInfrastructure: PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
    }),
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  static defaultProps = {
    criticalInfrastructure: null,
  };

  componentWillMount() {
    getFeatures();
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
   * Open Critical Infrastructure form
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
   * close Critical Infrastructure form
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
   * Search Critical Infrastructures List based on supplied filter word
   *
   * @function
   * @name searchFeatures
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
   * Handle on Edit action for list item
   *
   * @function
   * @name handleEdit
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = criticalInfrastructure => {
    selectFeature(criticalInfrastructure);
    this.setState({ isEditForm: true });
    openFeatureForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      criticalInfrastructures,
      loading,
      total,
      page,
      posting,
      showForm,
      criticalInfrastructure,
    } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="CriticalInfrastructerList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for Critical Infrastructures here ..."
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
              title="Add New Critical Infrastructure"
              onClick={this.openForm}
            >
              New Critical Infrastructure
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <CriticalInfrastructersActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}
        {/* list starts */}
        <CriticalInfrastructerList
          criticalInfrastructures={criticalInfrastructures}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Critical Infrastructures"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          destroyOnClose
          maskClosable={false}
          footer={null}
          width={800}
        >
          <CriticalInfrastructerFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={
            isEditForm
              ? 'Edit Critical Infrastructure'
              : 'Add New Critical Infrastructure'
          }
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <CriticalInfrastructerForm
            posting={posting}
            isEditForm={isEditForm}
            criticalInfrastructure={criticalInfrastructure}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(CriticalInfrastructers, {
  criticalInfrastructures: 'features.list',
  criticalInfrastructure: 'features.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
