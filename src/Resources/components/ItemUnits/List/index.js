import { httpActions } from '@codetanzania/emis-api-client';
import {
  refreshItemUnits,
  paginateItemUnits,
  deleteItemUnit,
} from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import intersectionBy from 'lodash/intersectionBy';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import ItemUnitListItem from '../ListItem';
import ListHeader from '../../../../components/ListHeader';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';

/* constants */
const headerLayout = [
  { span: 6, header: 'Name' },
  { span: 6, header: 'Abbreviation' },
  { span: 6, header: 'Description' },
];

const { getItemUnitsExportUrl } = httpActions;

/**
 * @class
 * @name ItemUnitList
 * @description Render item unit of measure list which have search box and actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemUnitList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    itemUnits: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  state = {
    selectedItemUnit: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleSelectItemUnit
   * @description Handle select single  item unit of measure checkbox
   *
   * @param {Object} itemUnit selected  item unit of measure object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectItemUnit = itemUnit => {
    const { selectedItemUnit } = this.state;
    this.setState({
      selectedItemUnit: concat([], selectedItemUnit, itemUnit),
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
    const { selectedItemUnit, selectedPages } = this.state;
    const { itemUnits, page } = this.props;
    const selectedList = uniqBy([...selectedItemUnit, ...itemUnits], '_id');
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedItemUnit: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectItemUnit
   * @description Handle deselect a single  item unit of measure checkbox
   *
   * @param {Object} itemUnit  item unit of measure objected to be removed from
   * list of selected adjustments
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectItemUnit = itemUnit => {
    const { selectedItemUnit } = this.state;
    const selectedList = [...selectedItemUnit];

    remove(selectedList, item => item._id === itemUnit._id); // eslint-disable-line

    this.setState({
      selectedItemUnit: selectedList,
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
    const { itemUnits, page } = this.props;
    const { selectedItemUnit, selectedPages } = this.state;
    const selectedList = [...selectedItemUnit];
    const pages = [...selectedPages];

    remove(pages, item => item === page);

    itemUnits.forEach(itemUnit => {
      remove(selectedList, item => item._id === itemUnit._id); // eslint-disable-line
    });

    this.setState({
      selectedItemUnit: selectedList,
      selectedPages: pages,
    });
  };

  render() {
    const { itemUnits, loading, total, page, onEdit } = this.props;
    const { selectedItemUnit, selectedPages } = this.state;
    const selectedItemUnitsCount = intersectionBy(
      this.state.selectedItemUnit,
      itemUnits,
      '_id'
    ).length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="item unit"
          page={page}
          total={total}
          selectedItemsCount={selectedItemUnitsCount}
          onPaginate={nextPage => {
            paginateItemUnits(nextPage);
          }}
          exportUrl={getItemUnitsExportUrl({
            filter: { _id: map(selectedItemUnit, '_id') },
          })}
          onRefresh={() =>
            refreshItemUnits(
              () => {
                notifySuccess('Item units refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Item units please contact system administrator'
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
          dataSource={itemUnits}
          renderItem={itemUnit => (
            <ItemUnitListItem
              key={itemUnit.id}
              name={itemUnit.value}
              abbreviation={itemUnit.abbreviation}
              description={itemUnit.description}
              color={itemUnit.color}
              isSelected={
                map(selectedItemUnit, '_id').includes(itemUnit._id) //eslint-disable-line
              }
              onSelectItem={() => {
                this.handleSelectItemUnit(itemUnit);
              }}
              onDeselectItem={() => {
                this.handleDeselectItemUnit(itemUnit);
              }}
              onEdit={() => onEdit(itemUnit)}
              onArchive={() =>
                deleteItemUnit(
                  itemUnit._id, // eslint-disable-line
                  () => {
                    notifySuccess('Unit of measure was archived successfully');
                  },
                  () => {
                    notifyError(
                      `An Error occurred while archiving Unit of measure please contact
                   system administrator`
                    );
                  }
                )
              }
            />
          )}
        />
        {/* end Item Unit Of Measure list */}
      </Fragment>
    );
  }
}

export default ItemUnitList;
