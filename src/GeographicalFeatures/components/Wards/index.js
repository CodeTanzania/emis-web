import {
  Connect,
  getFeatures,
  searchFeatures,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';
import WardsActionBar from './ActionBar';
import WardsList from './List';
import WardsFilters from './FIlters';

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
  state = {
    showFilters: false,
  };

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
   * Search wards List based on supplied filter word
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
    const { page, total, wards, loading } = this.props;
    const { showFilters } = this.state;

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
        {/* end list header */} {/* list starts */}
        <WardsList wards={wards} loading={loading} />
        {/* end list */}
        {/* filter modal */}
        <Modal
          title="Filter Wards"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          width={800}
        >
          <WardsFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}
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
