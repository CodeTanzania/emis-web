import {
  Connect,
  filterFeatures,
  searchFeatures,
  openFeatureForm,
  closeFeatureForm,
  selectFeature,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RegionsActionBar from './ActionBar';
import RegionsList from './List';
import RegionForm from './Form';
import RegionsFilters from './Filters';
import './styles.css';

const { Search } = Input;

/**
 *
 * @class
 * @name Regions
 * @description  Render Regions list which have search box,
 * actions and Regions list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Regions extends Component {
  state = {
    isEditForm: false,
    showFilters: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    regions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    region: PropTypes.shape({ name: PropTypes.string }),
    showForm: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    region: null,
  };

  componentDidMount() {
    filterFeatures({ type: 'Region', family: 'Administrative' });
  }

  /**
   *
   * @function
   * @name searchDistrict
   * @description Search Regions List based on supplied filter word
   *
   * @param {object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchRegions = event => {
    searchFeatures(event.target.value);
  };

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
   * @name openContactForm
   * @description Open region form
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
   * @description close region form
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
   * @param {object} region region object
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
      regions,
      loading,
      posting,
      showForm,
      region,
    } = this.props;
    const { isEditForm, showFilters } = this.state;

    return (
      <div className="Regions">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for regions here ..."
              onChange={this.searchRegions}
            />
            {/* end search input component */}
          </Col>

          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Region"
              onClick={this.openForm}
            >
              New Region
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <RegionsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}

        {/* list starts */}
        <RegionsList
          regions={regions}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Region"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          width={630}
          maskClosable={false}
        >
          <RegionsFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Region' : 'Add New Region'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <RegionForm
            posting={posting}
            isEditForm={isEditForm}
            region={region}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Regions, {
  regions: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
  region: 'features.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
});
