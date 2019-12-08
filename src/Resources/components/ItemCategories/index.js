import { httpActions } from '@codetanzania/emis-api-client';
import {
  closeItemCategoryForm,
  Connect,
  getItemCategories,
  openItemCategoryForm,
  searchItemCategories,
  selectItemCategory,
} from '@codetanzania/emis-api-states';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NotificationForm from '../../../components/NotificationForm';
import Topbar from '../../../components/Topbar';
import ItemForm from './Form';
import ItemCategoriesList from './List';
import './styles.css';

/* constants */
const { getItemCategories: getItemCategoriesFromAPI } = httpActions;

/**
 * @class
 * @name ItemCategories
 * @description Render itemCategory list which have search box, actions and a list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemCategories extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedItemCategories: [],
    notificationBody: undefined,
  };

  componentDidMount() {
    getItemCategories();
  }

  /**
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property
   * to false via state
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible property
   * to false via state
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * @function
   * @name openItemCategoryForm
   * @description Open itemCategory form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openItemCategoryForm = () => {
    openItemCategoryForm();
  };

  /**
   * @function
   * @name openItemCategoryForm
   * @description close itemCategory form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeItemCategoryForm = () => {
    closeItemCategoryForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchItemCategories
   * @description Search ItemCategories List based on supplied filter word
   *
   * @param {object} event - Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchItemCategories = event => {
    searchItemCategories(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for itemCategory list
   *
   * @param {object} itemCategory itemCategory to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = itemCategory => {
    selectItemCategory(itemCategory);
    this.setState({ isEditForm: true });
    openItemCategoryForm();
  };

  /**
   * @function
   * @name handleShare
   * @description Handle share single itemCategory action
   *
   * @param {object} itemCategory itemCategory to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleShare = itemCategory => {
    const message = `${itemCategory.name}\nMobile: ${itemCategory.mobile}\nEmail: ${itemCategory.email}`;

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name handleBulkShare
   * @description Handle share multiple itemCategories
   *
   * @param {object[]} itemCategories itemCategories list to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleBulkShare = itemCategories => {
    const itemList = itemCategories.map(
      itemCategory =>
        `${itemCategory.name}\nMobile: ${itemCategory.mobile}\nEmail: ${itemCategory.email}`
    );

    const message = itemList.join('\n\n\n');

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name openNotificationForm
   * @description Handle on notify itemCategories
   *
   * @param {object[]} itemCategories List of itemCategories selected to be notified
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = itemCategories => {
    this.setState({
      selectedItemCategories: itemCategories,
      showNotificationForm: true,
    });
  };

  /**
   * @function
   * @name closeNotificationForm
   * @description Handle on notify itemCategories
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeNotificationForm = () => {
    this.setState({ showNotificationForm: false });
  };

  /**
   * @function
   * @name handleAfterCloseForm
   * @description Perform post close form cleanups
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name handleAfterCloseNotificationForm
   * @description Perform post close notification form cleanups
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseNotificationForm = () => {
    this.setState({ notificationBody: undefined });
  };

  render() {
    const {
      itemCategories,
      itemCategory,
      loading,
      posting,
      page,
      showForm,
      searchQuery,
      total,
    } = this.props;
    const {
      showFilters,
      isEditForm,
      showNotificationForm,
      selectedItemCategories,
      notificationBody,
    } = this.state;
    return (
      <>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for Item Categories here ...',
            onChange: this.searchItemCategories,
            value: searchQuery,
          }}
          actions={[
            {
              label: 'New Item Category',
              icon: 'plus',
              size: 'large',
              title: 'Add New Item Category',
              onClick: this.openItemCategoryForm,
            },
          ]}
        />
        {/* end Topbar */}

        <div className="ItemCategories">
          {/* list starts */}
          <ItemCategoriesList
            total={total}
            page={page}
            itemCategories={itemCategories}
            loading={loading}
            onEdit={this.handleEdit}
            onNotify={this.openNotificationForm}
            onShare={this.handleShare}
            onBulkShare={this.handleBulkShare}
          />
          {/* end list */}

          {/* filter modal */}
          <Modal
            title="Filter Item Categories"
            visible={showFilters}
            onCancel={this.closeFiltersModal}
            footer={null}
            destroyOnClose
            maskClosable={false}
            width="50%"
          />
          {/* end filter modal */}

          {/* Notification Modal modal */}
          <Modal
            title="Notify Item Categories"
            visible={showNotificationForm}
            onCancel={this.closeNotificationForm}
            footer={null}
            destroyOnClose
            maskClosable={false}
            width="40%"
            afterClose={this.handleAfterCloseNotificationForm}
          >
            <NotificationForm
              recipients={selectedItemCategories}
              onSearchRecipients={getItemCategoriesFromAPI}
              body={notificationBody}
              onCancel={this.closeNotificationForm}
              onNotify={() => {}}
            />
          </Modal>
          {/* end Notification modal */}

          {/* create/edit form modal */}
          <Modal
            title={isEditForm ? 'Edit Item Category' : 'Add New Item Category'}
            visible={showForm}
            footer={null}
            onCancel={this.closeItemCategoryForm}
            destroyOnClose
            maskClosable={false}
            afterClose={this.handleAfterCloseForm}
          >
            <ItemForm
              posting={posting}
              isEditForm={isEditForm}
              itemCategory={itemCategory}
              onCancel={this.closeItemCategoryForm}
            />
          </Modal>
          {/* end create/edit form modal */}
        </div>
      </>
    );
  }
}

ItemCategories.propTypes = {
  loading: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  itemCategories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  itemCategory: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  page: PropTypes.number.isRequired,
  showForm: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
  total: PropTypes.number.isRequired,
};

ItemCategories.defaultProps = {
  itemCategory: null,
  searchQuery: undefined,
};

export default Connect(ItemCategories, {
  itemCategories: 'itemCategories.list',
  itemCategory: 'itemCategories.selected',
  loading: 'itemCategories.loading',
  posting: 'itemCategories.posting',
  page: 'itemCategories.page',
  showForm: 'itemCategories.showForm',
  total: 'itemCategories.total',
  searchQuery: 'itemCategories.q',
});
