import {
  refreshAdjustments,
  paginateAdjustments,
} from '@codetanzania/emis-api-states';
import { httpActions } from '@codetanzania/emis-api-client';
import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import intersectionBy from 'lodash/intersectionBy';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import AdjustmentsListItem from '../ListItem';
import ListHeader from '../../../../components/ListHeader';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const headerLayout = [
  { span: 4, header: 'Item' },
  { span: 3, header: 'Action' },
  { span: 2, header: 'Quantity' },
  { span: 3, header: 'Cost' },
  { span: 4, header: 'Reason' },
  { span: 3, header: 'Warehouse' },
  { span: 4, header: 'Adjustment Date' },
];
const { getAdjustmentsExportUrl } = httpActions;

/**
 * @class
 * @name AdjustmentsList
 * @description Render adjustment list which have search box and actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdjustmentsList extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { selectedAdjustments: [], selectedPages: [] };

  /**
   * @function
   * @name handleSelectAdjustment
   * @description Handle select single adjustment checkbox
   *
   * @param {object} adjustment selected adjustment object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAdjustment = adjustment => {
    const { selectedAdjustments } = this.state;
    this.setState({
      selectedAdjustments: concat([], selectedAdjustments, adjustment),
    });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all adjustment action in current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedAdjustments, selectedPages } = this.state;
    const { adjustments, page } = this.props;
    const selectedList = uniqBy(
      [...selectedAdjustments, ...adjustments],
      '_id'
    );
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedAdjustments: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAdjustment
   * @description Handle deselect a single adjustment checkbox
   *
   * @param {object} adjustment adjustment objected to be removed from
   * list of selected adjustments
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAdjustment = adjustment => {
    const { selectedAdjustments } = this.state;
    const selectedList = [...selectedAdjustments];

    remove(selectedList, item => item._id === adjustment._id); // eslint-disable-line

    this.setState({
      selectedAdjustments: selectedList,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all adjustments in a current page
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { adjustments, page } = this.props;
    const { selectedAdjustments, selectedPages } = this.state;
    const selectedList = [...selectedAdjustments];
    const pages = [...selectedPages];

    remove(pages, item => item === page);

    adjustments.forEach(adjustment => {
      remove(selectedList, item => item._id === adjustment._id); // eslint-disable-line
    });

    this.setState({
      selectedAdjustments: selectedList,
      selectedPages: pages,
    });
  };

  render() {
    const { adjustments, loading, total, page, onFilter } = this.props;
    const { selectedAdjustments, selectedPages } = this.state;
    const selectedAdjustmentsCount = intersectionBy(
      selectedAdjustments,
      adjustments,
      '_id'
    ).length;

    return (
      <>
        {/* toolbar */}
        <Toolbar
          itemName="adjustment"
          page={page}
          total={total}
          selectedItemsCount={selectedAdjustmentsCount}
          exportUrl={getAdjustmentsExportUrl({
            filter: { _id: map(selectedAdjustments, '_id') },
          })}
          onPaginate={nextPage => {
            paginateAdjustments(nextPage);
          }}
          onFilter={onFilter}
          onRefresh={() =>
            refreshAdjustments(
              () => {
                notifySuccess('Stocks adjustments refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing stocks adjustments please contact system administrator'
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

        {/* adjustments list */}
        <List
          loading={loading}
          dataSource={adjustments}
          renderItem={adjustment => (
            <AdjustmentsListItem
              key={adjustment.id}
              itemName={adjustment.item.name}
              warehouseName={adjustment.store.name}
              type={adjustment.type}
              quantity={adjustment.quantity}
              cost={adjustment.cost}
              reason={adjustment.reason}
              color={adjustment.item.color}
              creationDate={adjustment.updatedAt}
              isSelected={
                map(selectedAdjustments, '_id').includes(adjustment._id) //eslint-disable-line
              }
              onSelectItem={() => {
                this.handleSelectAdjustment(adjustment);
              }}
              onDeselectItem={() => {
                this.handleDeselectAdjustment(adjustment);
              }}
            />
          )}
        />
        {/* end adjustments list */}
      </>
    );
  }
}

AdjustmentsList.propTypes = {
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
  onFilter: PropTypes.func.isRequired,
};

export default AdjustmentsList;
