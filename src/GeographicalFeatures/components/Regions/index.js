import {
  Connect,
  getFeatures,
  searchFeatures,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RegionsActionBar from './ActionBar';
import RegionsList from './List';
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
  //   state = {
  //     showFilters: false,
  //   };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    regions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getFeatures();
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

  render() {
    const { page, total, regions, loading } = this.props;
    // const { showFilters } = this.state;

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
      </div>
    );
  }
}

export default Connect(Regions, {
  regions: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
