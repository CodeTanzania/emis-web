import { Connect, getFeatures } from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';
import WardsActionBar from './ActionBar';
import WardsList from './List';

const { Search } = Input;

/**
 * Render Wards list which have search box, actions and Wards list
 *
 * @class
 * @name Wards
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Wards extends Component {
  // state = {
  //   showFilters: false,
  // };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    wards: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getFeatures();
  }

  render() {
    const { page, total, wards, loading } = this.props;
    //   const { showFilters } = this.state;

    return (
      <div className="Wards">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search size="large" placeholder="Search for wards here ..." />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Ward"
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
          // onFilter={this.openFiltersModal}
        />
        {/* end list header */} {/* list starts */}
        <WardsList wards={wards} loading={loading} />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(Wards, {
  wards: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
