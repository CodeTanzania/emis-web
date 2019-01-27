import { Connect, getAdjustments } from '@codetanzania/emis-api-states';
import { Input, List, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AdjustmentsListItem from './ListItem';
import AdjustmentsActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * Render adjustment list which have search box and actions
 *
 * @class
 * @name AdjustmentList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdjustmentList extends Component {
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

  render() {
    const { adjustments, loading, total, page } = this.props;
    return (
      <div className="AdjustmentList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for adjustments here ..."
              onChange={({ target: { value } }) => getAdjustments({ q: value })}
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
        <AdjustmentsActionBar total={total} page={page} />
        {/* end list action bar */}
        {/* list starts */}
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
        {/* end list */}
      </div>
    );
  }
}

export default Connect(AdjustmentList, {
  adjustments: 'adjustments.list',
  loading: 'adjustments.loading',
  page: 'adjustments.page',
  total: 'adjustments.total',
});
