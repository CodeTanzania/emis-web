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
import './styles.css';

const { Search } = Input;

/**
 * Render Regions list which have search box, actions and Regions list
 *
 * @class
 * @name Regions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Regions extends Component {
  state = {
    isEditForm: false,
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
   * Search Regions List based on supplied filter word
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
  searchRegions = event => {
    searchFeatures(event.target.value);
  };

  /**
   * Open region form
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
   * close region form
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
      regions,
      loading,
      posting,
      showForm,
      region,
    } = this.props;
    const { isEditForm } = this.state;

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
        <RegionsActionBar total={total} page={page} />
        {/* end list header */}

        {/* list starts */}
        <RegionsList regions={regions} loading={loading} />
        {/* end list */}

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
  region: 'feature.selected',
  posting: 'features.posting',
  showForm: 'features.showForm',
});
