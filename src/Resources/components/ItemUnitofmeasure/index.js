import {
  Connect,
  searchAdjustments,
  getItems,
} from '@codetanzania/emis-api-states';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Topbar from '../../../components/Topbar';
import UnitOfMeasureList from './List';
import './styles.css';

/**
 * @class
 * @name ItemUnitOfMeasure
 * @description Render Item unit of measure module which has search box,
 *  actions and list of Item unit of measures
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemUnitOfMeasure extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    unitofmeasures: PropTypes.arrayOf(
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

  static defaultProps = {
    searchQuery: undefined,
  };

  // state = {
  //   showFilters: false,
  // };

  componentDidMount() {
    getItems();
  }

  // /**
  //  * @function
  //  * @name openFiltersModal
  //  * @description open filters modal by setting it's visible
  //  *  property to false via state
  //  *
  //  * @returns {undefined} undefined
  //  *
  //  * @version 0.1.0
  //  * @since 0.1.0
  //  */
  // openFiltersModal = () => {
  //   this.setState({ showFilters: true });
  // };

  // /**
  //  * @function
  //  * @name closeFiltersModal
  //  * @description Close filters modal by setting it's visible
  //  *  property to false via state
  //  *
  //  * @returns {undefined} undefined
  //  *
  //  * @version 0.1.0
  //  * @since 0.1.0
  //  */
  // closeFiltersModal = () => {
  //   this.setState({ showFilters: false });
  // };

  /**
   * @function
   * @name searchRoles
   * @description Search Roles List based on supplied filter word
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchAdjustments = event => {
    searchAdjustments(event.target.value);
  };

  render() {
    const { unitofmeasures, loading, total, page, searchQuery } = this.props;
    return (
      <Fragment>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for Item unit of measure here ...',
            onChange: this.searchAdjustments,
            value: searchQuery,
          }}
        />
        {/* end Topbar */}
        <div className="UnitOfMeasureList">
          {/* list starts */}
          <UnitOfMeasureList
            unitofmeasures={unitofmeasures}
            loading={loading}
            total={total}
            page={page}
          />
          {/* end list */}
        </div>
      </Fragment>
    );
  }
}

export default Connect(ItemUnitOfMeasure, {
  unitofmeasures: 'items.list',
  loading: 'items.loading',
  page: 'items.page',
  showForm: 'items.showForm',
  total: 'items.total',
  searchQuery: 'items.q',
});
