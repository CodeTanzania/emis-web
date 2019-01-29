import {
  Connect,
  getFeatures,
  searchFeatures,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DistrictsActionBar from './ActionBar';
import DistrictsList from './List';
import DistrictsFilters from './Filters';
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
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    districts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
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

  render() {
    const { page, total, districts, loading } = this.props;
    const { showFilters } = this.state;

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
        <DistrictsList districts={districts} loading={loading} />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Districts"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          width={800}
        >
          <DistrictsFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}
      </div>
    );
  }
}

export default Connect(Districts, {
  districts: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
