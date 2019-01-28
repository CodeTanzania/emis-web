import { Connect, getAdjustments } from '@codetanzania/emis-api-states';
import { Input, Col, Row, Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AdjustmentsActionBar from './ActionBar';
import AdjustmentList from './List';
import AdjustmentFilters from './Filters';

import './styles.css';

const { Search } = Input;

/**
 * Render adjustments module which has search box, actions and list of adjustments
 *
 * @class
 * @name Adjustments
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Adjustments extends Component {
  state = {
    showFilters: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    adjustments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        item: PropTypes.shape({
          name: PropTypes.string,
          color: PropTypes.color,
        }),
        type: PropTypes.string,
        quantity: PropTypes.number,
        cost: PropTypes.number,
        reason: PropTypes.string,
        store: PropTypes.shape({ name: PropTypes.string }),
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getAdjustments();
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
   * Search Roles List based on supplied filter word
   *
   * @function
   * @name searchRoles
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchAdjustments = event => {
    getAdjustments({ q: event.target.value });
  };

  render() {
    const { adjustments, loading, total, page } = this.props;
    const { showFilters } = this.state;
    return (
      <div className="AdjustmentList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for adjustments here ..."
              onChange={this.searchAdjustments}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Adjustment"
            >
              New Adjustment
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <AdjustmentsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}
        {/* list starts */}
        <AdjustmentList adjustments={adjustments} loading={loading} />
        {/* end list */}
        <Modal
          title="Filter Adjustments"
          visible={showFilters}
          width={650}
          onCancel={this.closeFiltersModal}
          footer={null}
        >
          <AdjustmentFilters onCancel={this.closeFiltersModal} />
        </Modal>
      </div>
    );
  }
}

export default Connect(Adjustments, {
  adjustments: 'adjustments.list',
  loading: 'adjustments.loading',
  page: 'adjustments.page',
  total: 'adjustments.total',
});
