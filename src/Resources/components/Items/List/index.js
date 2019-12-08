import { httpActions } from '@codetanzania/emis-api-client';
import {
  deleteItem,
  paginateItems,
  refreshItems,
} from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import intersectionBy from 'lodash/intersectionBy';
import map from 'lodash/map';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ListHeader from '../../../../components/ListHeader';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';
import ListItem from '../ListItem';

/* constants */
const nameSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 8, xs: 8 };
const typeSpan = { xxl: 5, xl: 5, lg: 4, md: 4, sm: 6, xs: 6 };
const descriptionSpan = { xxl: 10, xl: 10, lg: 10, md: 8, sm: 0, xs: 0 };
const headerLayout = [
  { ...nameSpan, header: 'Name' },
  { ...typeSpan, header: 'Type' },
  { ...descriptionSpan, header: 'Description' },
];
const { getItemsExportUrl } = httpActions;

/**
 * @class
 * @name ItemsList
 * @description Render ItemsList component which have actionBar, Items
 * header and Items list components
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemsList extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedItems: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnSelectItem
   * @description Handle select a single item action
   *
   * @param {object} item selected item object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectItem = item => {
    const { selectedItems } = this.state;
    this.setState({
      selectedItems: concat([], selectedItems, item),
    });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all items actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedItems, selectedPages } = this.state;
    const { items, page } = this.props;
    const selectedList = uniqBy([...selectedItems, ...items], '_id');
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedItems: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all items in a current page
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { items, page } = this.props;
    const { selectedItems, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedItems], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    items.forEach(resourceItem => {
      remove(
        selectedList,
        item => item._id === resourceItem._id // eslint-disable-line
      );
    });

    this.setState({
      selectedItems: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleFilterByStatus
   * @description Handle filter items by status action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleFilterByStatus = () => {
    // if (status === 'All') {
    //   filter({});
    // } else if (status === 'Active') {
    //   filter({});
    // } else if (status === 'Archived') {
    //   filter({});
    // }
  };

  /**
   * @function
   * @name handleOnDeselectItem
   * @description Handle deselect a single item action
   *
   * @param {object} resourceItem item to be removed from selected items
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectItem = resourceItem => {
    const { selectedItems } = this.state;
    const selectedList = [...selectedItems];

    remove(
      selectedList,
      item => item._id === resourceItem._id // eslint-disable-line
    );

    this.setState({ selectedItems: selectedList });
  };

  render() {
    const {
      items,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onShare,
    } = this.props;
    const { selectedItems, selectedPages } = this.state;
    const selectedItemsCount = intersectionBy(selectedItems, items, '_id')
      .length;

    return (
      <>
        {/* toolbar */}
        <Toolbar
          itemName="item"
          page={page}
          total={total}
          selectedItemsCount={selectedItemsCount}
          exportUrl={getItemsExportUrl({
            filter: { _id: map(selectedItems, '_id') },
          })}
          onFilter={onFilter}
          onPaginate={nextPage => {
            paginateItems(nextPage);
          }}
          onRefresh={() =>
            refreshItems(
              () => {
                notifySuccess('Items refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Items please contact system administrator'
                );
              }
            )
          }
        />
        {/* end toolbar */}

        {/* item list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end item list header */}

        {/* items list */}
        <List
          loading={loading}
          dataSource={items}
          renderItem={item => (
            <ListItem
              key={item._id} // eslint-disable-line
              abbreviation={item.name.charAt(0).toUpperCase()}
              name={item.name}
              type={item.type ? item.type : 'N/A'}
              description={item.description ? item.description : 'N/A'}
              isSelected={
                // eslint-disable-next-line
                map(selectedItems, item => item._id).includes(
                  item._id // eslint-disable-line
                )
              }
              onSelectItem={() => {
                this.handleOnSelectItem(item);
              }}
              onDeselectItem={() => {
                this.handleOnDeselectItem(item);
              }}
              onEdit={() => onEdit(item)}
              onArchive={() =>
                deleteItem(
                  item._id, // eslint-disable-line
                  () => {
                    notifySuccess('Item was archived successfully');
                  },
                  () => {
                    notifyError(
                      'An Error occurred while archiving Item please contact system administrator'
                    );
                  }
                )
              }
              onShare={() => {
                onShare(item);
              }}
            />
          )}
        />
        {/* end items list */}
      </>
    );
  }
}

ItemsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};

export default ItemsList;
