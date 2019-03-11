import { httpActions } from '@codetanzania/emis-api-client';
import {
  refreshWarehouses,
  paginateWarehouses,
  // deleteWarehouse,
} from '@codetanzania/emis-api-states';
import { List } from 'antd';
import PropTypes from 'prop-types';
import concat from 'lodash/concat';
import intersectionBy from 'lodash/intersectionBy';
import map from 'lodash/map';
import remove from 'lodash/remove';
import React, { Fragment } from 'react';
import ListHeader from '../../../../components/ListHeader';
import Toolbar from '../../../../components/Toolbar';
import WarehouseListItem from '../ListItem';
import { notifyError, notifySuccess } from '../../../../util';

const { getWarehousesExportUrl } = httpActions;

const headerLayout = [
  { span: 5, header: 'Name', offset: 1 },
  { span: 6, header: 'Level', offset: 4 },
];

// eslint-disable-next-line jsdoc/require-returns
/**
 * @class
 * @name WarehouseList
 * @description Render warehouse list which have search box and actions
 *
 * @param {Object} props props object
 * @param {Array} props.warehouses array of warehouses
 * @param {boolean} props.loading represents loading status
 * @param {Function} props.onEdit call back function called
 * during editing a stock
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class WarehouseList extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired, 
    loading: PropTypes.bool.isRequired,
    warehouses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        level: PropTypes.string,
      })
    ).isRequired,
  };

  state = {
    selectedWarehouse: [],
    // selectedPages: [],
  };

  /**
   * @function
   * @name handleOnSelectWarehouse
   * @description Handle select a single warehouse action
   *
   * @param {Object} warehouse selected warehouse object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectWarehouse = warehouse => {
    const { selectedWarehouse } = this.state;
    this.setState({
      selectedWarehouse: concat([], selectedWarehouse, warehouse),
    });
  };

  /**
   * @function
   * @name handleOnDeselectWarehouse
   * @description Handle deselect a single focalPerson action
   *
   * @param {Object} warehouse focalPerson to be removed from selected focalPeople
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectWarehouse = warehouse => {
    const { selectedWarehouse } = this.state;
    const selectedList = [...selectedWarehouse];

    remove(
      selectedList,
      item => item._id === warehouse._id // eslint-disable-line
    );

    this.setState({ selectedWarehouse: selectedList });
  };

  render() {
    const { warehouses, loading, onEdit, total, page, onFilter } = this.props;
    const { selectedWarehouse } = this.state;
    const selectedWarehouseCount = intersectionBy(
      this.state.selectedFocalPeople,
      warehouses,
      '_id'
    ).length;
    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="Warehouse"
          page={page}
          total={total}
          selectedItemsCount={selectedWarehouseCount}
          exportUrl={getWarehousesExportUrl({
            filter: { _id: map(selectedWarehouse, '_id') },
          })}
          onFilter={onFilter}
          onPaginate={nextPage => {
            paginateWarehouses(nextPage);
          }}
          onRefresh={() =>
            refreshWarehouses(
              () => {
                notifySuccess('Warehouse refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Warehouses please contact system administrator'
                );
              }
            )
          }
        />
        {/* end toolbar */}
        {/* Warehouse list header */}
        <ListHeader headerLayout={headerLayout} />
        {/* end Warehouse list header */}{' '}
        <List
          loading={loading}
          dataSource={warehouses}
          renderItem={warehouse => (
            <WarehouseListItem
              key={warehouse.name}
              name={warehouse.name}
              level={warehouse.level}
              onEdit={() => onEdit(warehouse)}
              isSelected={
                // eslint-disable-next-line
                map(selectedWarehouse, item => item._id).includes(warehouse._id)
              }
              onSelectItem={() => {
                this.handleOnSelectWarehouse(warehouse);
              }}
              onDeselectItem={() => {
                this.handleOnDeselectWarehouse(warehouse);
              }}
            />
          )}
        />
      </Fragment>
    );
  }
}

export default WarehouseList;
