import { paginateItems, refreshItems } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import intersectionBy from 'lodash/intersectionBy';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import ItemUnitOfMeasureListItem from '../ListItem';
import ListHeader from '../../../../components/ListHeader';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const headerLayout = [
  { span: 6, header: 'Name' },
  { span: 5, header: 'Type' },
  { span: 5, header: 'Maximum' },
  { span: 4, header: 'Minimum' },
];

/**
 * @class
 * @name UnitOfMeasureList
 * @description Render item unit of measure list which have search box and actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class UnitOfMeasureList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    unitofmeasures: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        minStockAllowed: PropTypes.string,
        maxStockAllowed: PropTypes.string,
        color: PropTypes.string,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  state = {
    selectedUnitOfMeasure: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleSelectItemUnitOfMeasure
   * @description Handle select single  item unit of measure checkbox
   *
   * @param {Object} unitofmeasure selected  item unit of measure object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectItemUnitOfMeasure = unitofmeasure => {
    const { selectedUnitOfMeasure } = this.state;
    this.setState({
      selectedUnitOfMeasure: concat([], selectedUnitOfMeasure, unitofmeasure),
    });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all  item unit of measure action in current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedUnitOfMeasure, selectedPages } = this.state;
    const { unitofmeasures, page } = this.props;
    const selectedList = uniqBy(
      [...selectedUnitOfMeasure, ...unitofmeasures],
      '_id'
    );
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedUnitOfMeasure: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectItemUnitOfMeasure
   * @description Handle deselect a single  item unit of measure checkbox
   *
   * @param {Object} unitofmeasure  item unit of measure objected to be removed from
   * list of selected adjustments
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectItemUnitOfMeasure = unitofmeasure => {
    const { selectedUnitOfMeasure } = this.state;
    const selectedList = [...selectedUnitOfMeasure];

    remove(selectedList, item => item._id === unitofmeasure._id); // eslint-disable-line

    this.setState({
      selectedUnitOfMeasure: selectedList,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all item unit of measure in a current page
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { unitofmeasures, page } = this.props;
    const { selectedUnitOfMeasure, selectedPages } = this.state;
    const selectedList = [...selectedUnitOfMeasure];
    const pages = [...selectedPages];

    remove(pages, item => item === page);

    unitofmeasures.forEach(unitofmeasure => {
      remove(selectedList, item => item._id === unitofmeasure._id); // eslint-disable-line
    });

    this.setState({
      selectedUnitOfMeasure: selectedList,
      selectedPages: pages,
    });
  };

  render() {
    const { unitofmeasures, loading, total, page } = this.props;
    const { selectedUnitOfMeasure, selectedPages } = this.state;
    const selectedItemUnitsCount = intersectionBy(
      this.state.selectedUnitOfMeasure,
      unitofmeasures,
      '_id'
    ).length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="item unit of measure"
          page={page}
          total={total}
          selectedItemsCount={selectedItemUnitsCount}
          onPaginate={nextPage => {
            paginateItems(nextPage);
          }}
          onRefresh={() =>
            refreshItems(
              () => {
                notifySuccess('Item unit of measure refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Item unit of measure please contact system administrator'
                );
              }
            )
          }
        />
        {/* end toolbar */}

        {/* list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* list header */}

        {/* Item Unit Of Measure list */}
        <List
          loading={loading}
          dataSource={unitofmeasures}
          renderItem={unitofmeasure => (
            <ItemUnitOfMeasureListItem
              key={unitofmeasure.id}
              name={unitofmeasure.name}
              type={unitofmeasure.type}
              maxStockAllowed={unitofmeasure.maxStockAllowed}
              minStockAllowed={unitofmeasure.minStockAllowed}
              color={unitofmeasure.color}
              isSelected={
                map(selectedUnitOfMeasure, '_id').includes(unitofmeasure._id) //eslint-disable-line
              }
              onSelectItem={() => {
                this.handleSelectItemUnitOfMeasure(unitofmeasure);
              }}
              onDeselectItem={() => {
                this.handleDeselectItemUnitOfMeasure(unitofmeasure);
              }}
            />
          )}
        />
        {/* end Item Unit Of Measure list */}
      </Fragment>
    );
  }
}

export default UnitOfMeasureList;
