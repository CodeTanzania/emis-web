import {
    getAdjustments,
  } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import ItemUnitOfMeasureListItem from '../ListItem';
import ListHeader from '../../../../components/ListHeader';
import Toolbar from '../../../../components/Toolbar';

/* constants */
const headerLayout = [
  { span: 6, header: 'Item' },
  { span: 5, header: 'Action' },
  { span: 5, header: 'Quantity' },
  { span: 4, header: 'Cost' },
];

/**
 * @class
 * @name UnitOfMeasureList
 * @description Render adjustment list which have search box and actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class UnitOfMeasureList extends Component {
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
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  componentDidMount() {
    getAdjustments();

  }

  render() {
    const { unitofmeasures, loading, total, page } = this.props;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar itemName="item unit of measure" page={page} total={total} />
        {/* end toolbar */}

        {/* list header */}
        <ListHeader headerLayout={headerLayout} />
        {/* list header */}

        {/* Item Unit Of Measure list */}
        <List
          loading={loading}
          dataSource={unitofmeasures}
          renderItem={unitofmeasure => (
            <ItemUnitOfMeasureListItem
              key={unitofmeasure.id}
              itemName={unitofmeasure.item.name}
              type={unitofmeasure.type}
              quantity={unitofmeasure.quantity}
              cost={unitofmeasure.cost}
              color={unitofmeasure.item.color}
            />
          )}
        />
        {/* end Item Unit Of Measure list */}
      </Fragment>
    );
  }
}

export default UnitOfMeasureList;
