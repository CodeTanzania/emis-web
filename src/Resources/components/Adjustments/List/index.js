import {
  refreshAdjustments,
  paginateAdjustments,
} from '@codetanzania/emis-api-states';
import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import intersectionBy from 'lodash/intersectionBy';
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
  { span: 4, header: 'Warehouse' },
];

/**
 * @function
 * @name AdjustmentList
 * @description Render adjustment list which have search box and actions
 *
 * @param {Object} props props object
 * @param {Array} props.adjustments array of adjustments
 * @param {boolean} props.loading loading status
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdjustmentsList extends Component {
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

  state = { selectedAdjustments: [] };

  render() {
    const { adjustments, loading, total, page } = this.props;
    const { selectedAdjustments } = this.state;
    const selectedAdjustmentsCount = intersectionBy(
      selectedAdjustments,
      adjustments,
      '_id'
    ).length;

    return (
      <Fragment>
        <Toolbar
          itemName="adjustment"
          page={page}
          total={total}
          selectedItemsCount={selectedAdjustmentsCount}
          onPaginate={nextPage => {
            paginateAdjustments(nextPage);
          }}
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
        <ListHeader headerLayout={headerLayout} />
        <List
          loading={loading}
          dataSource={adjustments}
          renderItem={({
            _id: id,
            type,
            quantity,
            cost,
            reason,
            item: { name: itemName, color },
            store: { name: warehouseName },
          }) => (
            <AdjustmentsListItem
              key={id}
              itemName={itemName}
              warehouseName={warehouseName}
              type={type}
              quantity={quantity}
              cost={cost}
              reason={reason}
              color={color}
            />
          )}
        />
      </Fragment>
    );
  }
}

export default AdjustmentsList;
