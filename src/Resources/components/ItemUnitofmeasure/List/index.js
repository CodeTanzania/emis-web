import { paginateItems, refreshItems } from '@codetanzania/emis-api-states';
import { List } from 'antd';
// import concat from 'lodash/concat';
import map from 'lodash/map';
// import remove from 'lodash/remove';
// import uniq from 'lodash/uniq';
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
 * @description Render unit of measure list which have search box and actions
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
    // selectedPages: [],
  };

  render() {
    const { unitofmeasures, loading, total, page } = this.props;
    const { selectedUnitOfMeasure } = this.state;
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
        <ListHeader headerLayout={headerLayout} />
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
            />
          )}
        />
        {/* end Item Unit Of Measure list */}
      </Fragment>
    );
  }
}

export default UnitOfMeasureList;
