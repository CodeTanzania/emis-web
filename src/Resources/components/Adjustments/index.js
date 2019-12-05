import {
  Connect,
  getAdjustments,
  searchAdjustments,
} from '@codetanzania/emis-api-states';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Topbar from '../../../components/Topbar';
import AdjustmentList from './List';
import AdjustmentFilters from './Filters';
import './styles.css';

/**
 * @class
 * @name Adjustments
 * @description Render adjustments module which has search box,
 *  actions and list of adjustments
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Adjustments extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
  };

  componentDidMount() {
    getAdjustments();
  }

  /**
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible
   *  property to false via state
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible
   *  property to false via state
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * @function
   * @name searchRoles
   * @description Search Roles List based on supplied filter word
   *
   * @param {object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchAdjustments = event => {
    searchAdjustments(event.target.value);
  };

  render() {
    const { adjustments, loading, total, page, searchQuery } = this.props;
    const { showFilters } = this.state;
    return (
      <>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for adjustments here ...',
            onChange: this.searchAdjustments,
            value: searchQuery,
          }}
        />
        {/* end Topbar */}
        <div className="AdjustmentList">
          {/* list starts */}
          <AdjustmentList
            adjustments={adjustments}
            loading={loading}
            total={total}
            page={page}
            onFilter={this.openFiltersModal}
          />
          {/* end list */}

          {/* adjustments filters */}
          <Modal
            title="Filter Adjustments"
            visible={showFilters}
            width={650}
            maskClosable={false}
            destroyOnClose
            onCancel={this.closeFiltersModal}
            footer={null}
          >
            <AdjustmentFilters onCancel={this.closeFiltersModal} />
          </Modal>
          {/* end adjustments filters */}
        </div>
      </>
    );
  }
}

Adjustments.propTypes = {
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
  searchQuery: PropTypes.string,
};

Adjustments.defaultProps = {
  searchQuery: undefined,
};

export default Connect(Adjustments, {
  adjustments: 'adjustments.list',
  loading: 'adjustments.loading',
  page: 'adjustments.page',
  showForm: 'adjustments.showForm',
  total: 'adjustments.total',
  searchQuery: 'adjustments.q',
});
