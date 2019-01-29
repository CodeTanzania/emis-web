import {
  Connect,
  getFeatures,
  searchFeatures,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';
import DistrictsActionBar from './ActionBar';
import DistrictsList from './List';

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
  //   state = {
  //     showFilters: false,
  //   };

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
        <DistrictsActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
        <DistrictsList districts={districts} loading={loading} />
        {/* end list */}
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
