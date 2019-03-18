import { httpActions } from '@codetanzania/emis-api-client';
import {
  deleteItemCategory,
  paginateItemCategories,
  refreshItemCategories,
} from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import intersectionBy from 'lodash/intersectionBy';
import map from 'lodash/map';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ListHeader from '../../../../components/ListHeader';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';
import ListItem from '../ListItem';

/* constants */
const headerLayout = [
  { span: 6, header: 'Name' },
  { span: 14, header: 'Description' },
];
const { getItemCategoriesExportUrl } = httpActions;

/**
 * @class
 * @name ItemCategoriesList
 * @description Render ItemCategoriesList component which have actionBar, ItemCategories
 * header and ItemCategories list components
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemCategoriesList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    itemCategories: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        abbreviation: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
  };

  state = {
    selectedItemCategories: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnSelectItem
   * @description Handle select a single itemCategory action
   *
   * @param {Object} itemCategory selected itemCategory object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectItem = itemCategory => {
    const { selectedItemCategories } = this.state;
    this.setState({
      selectedItemCategories: concat([], selectedItemCategories, itemCategory),
    });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all itemCategories actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedItemCategories, selectedPages } = this.state;
    const { itemCategories, page } = this.props;
    const selectedList = uniqBy(
      [...selectedItemCategories, ...itemCategories],
      '_id'
    );
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedItemCategories: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all itemCategories in a current page
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { itemCategories, page } = this.props;
    const { selectedItemCategories, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedItemCategories], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, itemCategory => itemCategory === page);

    itemCategories.forEach(itemCategory => {
      remove(
        selectedList,
        item => item._id === itemCategory._id // eslint-disable-line
      );
    });

    this.setState({
      selectedItemCategories: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleOnDeselectItem
   * @description Handle deselect a single itemCategory action
   *
   * @param {Object} itemCategory itemCategory to be removed from selected itemCategories
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectItem = itemCategory => {
    const { selectedItemCategories } = this.state;
    const selectedList = [...selectedItemCategories];

    remove(
      selectedList,
      item => item._id === itemCategory._id // eslint-disable-line
    );

    this.setState({ selectedItemCategories: selectedList });
  };

  render() {
    const {
      itemCategories,
      loading,
      page,
      total,
      onEdit,
      onShare,
    } = this.props;
    const { selectedItemCategories, selectedPages } = this.state;
    const selectedItemsCount = intersectionBy(
      this.state.selectedItemCategories,
      itemCategories,
      '_id'
    ).length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="item category"
          page={page}
          total={total}
          selectedItemsCount={selectedItemsCount}
          exportUrl={getItemCategoriesExportUrl({
            filter: { _id: map(selectedItemCategories, '_id') },
          })}
          onPaginate={nextPage => {
            paginateItemCategories(nextPage);
          }}
          onRefresh={() =>
            refreshItemCategories(
              () => {
                notifySuccess('Item categories refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Item categories please contact system administrator'
                );
              }
            )
          }
        />
        {/* end toolbar */}

        {/* itemCategory list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end itemCategory list header */}

        {/* itemCategories list */}
        <List
          loading={loading}
          dataSource={itemCategories}
          renderItem={itemCategory => (
            <ListItem
              key={itemCategory._id} // eslint-disable-line
              abbreviation={itemCategory.abbreviation}
              name={itemCategory.value}
              color={itemCategory.color}
              description={
                itemCategory.description ? itemCategory.description : 'N/A'
              }
              isSelected={
                // eslint-disable-next-line
                map(
                  selectedItemCategories,
                  item => item._id // eslint-disable-line
                ).includes(
                  itemCategory._id // eslint-disable-line
                )
              }
              onSelectItem={() => {
                this.handleOnSelectItem(itemCategory);
              }}
              onDeselectItem={() => {
                this.handleOnDeselectItem(itemCategory);
              }}
              onEdit={() => onEdit(itemCategory)}
              onArchive={() =>
                deleteItemCategory(
                  itemCategory._id, // eslint-disable-line
                  () => {
                    notifySuccess('Item category was archived successfully');
                  },
                  () => {
                    notifyError(
                      'An Error occurred while archiving Item category please contact system administrator'
                    );
                  }
                )
              }
              onShare={() => {
                onShare(itemCategory);
              }}
            />
          )}
        />
        {/* end itemCategories list */}
      </Fragment>
    );
  }
}

export default ItemCategoriesList;
