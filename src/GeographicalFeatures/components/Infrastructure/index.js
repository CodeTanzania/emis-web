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
import CriticalInfrastructureList from './List';
import CriticalInfrastructureForm from './Form';
import CriticalInfrastructuresFilters from './Filters';
import CriticalInfrastructuresActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * @class
 * @name CriticalInfrastructures
 * @description Render Critical Infrastructure module which has search box,
 *  actions and list of Critical Infrastructures
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class CriticalInfrastructures extends Component {
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
   * to false via state
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
   * @description Close filters modal by setting it's visible property
   *  to false via state
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
   * @description Open Critical Infrastructure form
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
   * @description close Critical Infrastructure form
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
   * @description Search Critical Infrastructures List based on
   * supplied filter word
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
   * @param {object} criticalInfrastructure critical Infrastructure object
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
      <div className="CriticalInfrastructureList">
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
        <CriticalInfrastructuresActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}
        {/* list starts */}
        <CriticalInfrastructureList
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
          <CriticalInfrastructuresFilters onCancel={this.closeFiltersModal} />
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
          <CriticalInfrastructureForm
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

CriticalInfrastructures.propTypes = {
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

CriticalInfrastructures.defaultProps = {
  criticalInfrastructure: null,
};

export default Connect(CriticalInfrastructures, {
  criticalInfrastructures: 'features.list',
  criticalInfrastructure: 'features.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
