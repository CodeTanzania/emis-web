import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import AdjustmentListHeader from '../ListHeader';
import AdjustmentsListItem from '../ListItem';

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
const AdjustmentList = ({ adjustments, loading }) => (
  <Fragment>
    <AdjustmentListHeader />
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

AdjustmentList.propTypes = {
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
};

export default AdjustmentList;
