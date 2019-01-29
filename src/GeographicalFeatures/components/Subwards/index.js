import {
  Connect,
  getFeatures,
  searchFeatures,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SubwardsActionBar from './ActionBar';
import SubwardsList from './List';
import SubwardsFilters from './Filters';
import './styles.css';

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
  state = {
    showFilters: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    subwards: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
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
   * Search Wards List based on supplied filter word
   *
   * @function
   * @name searchWards
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */

  searchWards = event => {
    searchFeatures(event.target.value);
  };

  render() {
    const { page, total, subwards, loading } = this.props;
    const { showFilters } = this.state;

    return (
      <div className="Subwards">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for subwards here ..."
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
              title="Add New Subward"
            >
              New Subward
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list header */}
        <SubwardsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}
        {/* list starts */}
        <SubwardsList subwards={subwards} loading={loading} />
        {/* end list */}
        {/* filter modal */}
        <Modal
          title="Filter Subwards"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          width={800}
        >
          <SubwardsFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}
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
