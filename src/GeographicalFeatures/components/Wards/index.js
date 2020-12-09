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
import WardsFilters from './Filters';
import WardForm from './Form';
import './styles.css';

const { Search } = Input;

/**
 *
 * @class
 * @name Wards
 * @description Render Wards list which have search box, actions and Wards list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Wards extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
  };

  componentDidMount() {
    filterFeatures({ type: 'Ward', family: 'Administrative' });
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
   *  false via state
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
   * @name searchWards
   * @description Search wards List based on supplied filter word
   *
   * @param {object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchWards = event => {
    searchFeatures(event.target.value);
  };

  /**
   *
   * @function
   * @name openForm
   * @description Open ward form
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
   * @description close ward form
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
   * @param {object} ward ward object
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

Wards.propTypes = {
  loading: PropTypes.bool.isRequired,
  wards: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  posting: PropTypes.bool.isRequired,
  ward: PropTypes.shape({ name: PropTypes.string }),
  showForm: PropTypes.bool.isRequired,
};

Wards.defaultProps = {
  ward: null,
};

export default Connect(Wards, {
  wards: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
  ward: 'features.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
});
