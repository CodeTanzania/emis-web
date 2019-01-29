import { Connect, getFeatures } from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';
import SubwardsActionBar from './ActionBar';

const { Search } = Input;

/**
 * Render subwards list which have search box, actions and subwards list
 *
 * @class
 * @name Subwards
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Subwards extends Component {
  // state = {
  //   showFilters: false,
  // };

  static propTypes = {
    //   loading: PropTypes.bool.isRequired,
    //   districts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    //     .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getFeatures();
  }

  render() {
    const { page, total } = this.props;
    // const { showFilters } = this.state;

    return (
      <div className="Subwards">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search size="large" placeholder="Search for subwards here ..." />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Subward"
            >
              New Subward
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list header */}
        <SubwardsActionBar total={total} page={page} />
        {/* end list header */}
      </div>
    );
  }
}

export default Connect(Subwards, {
  subwards: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
