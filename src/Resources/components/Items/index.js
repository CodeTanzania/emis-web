import { httpActions } from '@codetanzania/emis-api-client';
import {
  closeItemForm,
  Connect,
  getItems,
  openItemForm,
  searchItems,
  selectItem,
} from '@codetanzania/emis-api-states';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import NotificationForm from '../../../components/NotificationForm';
import Topbar from '../../../components/Topbar';
import ItemFilters from './Filters';
import ItemForm from './Form';
import ItemsList from './List';
import './styles.css';

/* constants */
const { getItems: getItemsFromAPI } = httpActions;

/**
 * @class
 * @name Items
 * @description Render item list which have search box, actions and a list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Items extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedItems: [],
    notificationBody: undefined,
  };

  componentDidMount() {
    getItems();
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
   * @name openItemForm
   * @description Open item form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openItemForm = () => {
    openItemForm();
  };

  /**
   * @function
   * @name openItemForm
   * @description close item form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeItemForm = () => {
    closeItemForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchItems
   * @description Search Items List based on supplied filter word
   *
   * @param {object} event - Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchItems = event => {
    searchItems(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} item item to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = item => {
    selectItem(item);
    this.setState({ isEditForm: true });
    openItemForm();
  };

  /**
   * @function
   * @name handleShare
   * @description Handle share single item action
   *
   * @param {object} item item to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleShare = item => {
    const message = `${item.name}\nMobile: ${item.mobile}\nEmail: ${item.email}`;

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name handleBulkShare
   * @description Handle share multiple focal People
   *
   * @param {object[]} items focal People list to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleBulkShare = items => {
    const itemList = items.map(
      item => `${item.name}\nMobile: ${item.mobile}\nEmail: ${item.email}`
    );

    const message = itemList.join('\n\n\n');

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name openNotificationForm
   * @description Handle on notify items
   *
   * @param {object[]} items List of items selected to be notified
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = items => {
    this.setState({
      selectedItems: items,
      showNotificationForm: true,
    });
  };

  /**
   * @function
   * @name closeNotificationForm
   * @description Handle on notify items
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
      items,
      item,
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
      selectedItems,
      notificationBody,
    } = this.state;
    return (
      <>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for items here ...',
            onChange: this.searchItems,
            value: searchQuery,
          }}
          actions={[
            {
              label: 'New Item',
              icon: 'plus',
              size: 'large',
              title: 'Add New Item',
              onClick: this.openItemForm,
            },
          ]}
        />
        {/* end Topbar */}

        <div className="ItemsList">
          {/* list starts */}
          <ItemsList
            total={total}
            page={page}
            items={items}
            loading={loading}
            onEdit={this.handleEdit}
            onFilter={this.openFiltersModal}
            onNotify={this.openNotificationForm}
            onShare={this.handleShare}
            onBulkShare={this.handleBulkShare}
          />
          {/* end list */}

          {/* filter modal */}
          <Modal
            title="Filter Items"
            visible={showFilters}
            onCancel={this.closeFiltersModal}
            footer={null}
            destroyOnClose
            maskClosable={false}
            width="50%"
          >
            <ItemFilters onCancel={this.closeFiltersModal} />
          </Modal>
          {/* end filter modal */}

          {/* Notification Modal modal */}
          <Modal
            title="Notify Items"
            visible={showNotificationForm}
            onCancel={this.closeNotificationForm}
            footer={null}
            destroyOnClose
            maskClosable={false}
            width="40%"
            afterClose={this.handleAfterCloseNotificationForm}
          >
            <NotificationForm
              recipients={selectedItems}
              onSearchRecipients={getItemsFromAPI}
              body={notificationBody}
              onCancel={this.closeNotificationForm}
              onNotify={() => {}}
            />
          </Modal>
          {/* end Notification modal */}

          {/* create/edit form modal */}
          <Modal
            title={isEditForm ? 'Edit Item' : 'Add New Item'}
            visible={showForm}
            footer={null}
            onCancel={this.closeItemForm}
            destroyOnClose
            maskClosable={false}
            afterClose={this.handleAfterCloseForm}
          >
            <ItemForm
              posting={posting}
              isEditForm={isEditForm}
              item={item}
              onCancel={this.closeItemForm}
            />
          </Modal>
          {/* end create/edit form modal */}
        </div>
      </>
    );
  }
}

Items.propTypes = {
  loading: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      maxStockAllowed: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      minStockAllowed: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  item: PropTypes.shape({ name: PropTypes.string }),
  page: PropTypes.number.isRequired,
  showForm: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
  total: PropTypes.number.isRequired,
};

Items.defaultProps = {
  item: null,
  searchQuery: undefined,
};

export default Connect(Items, {
  items: 'items.list',
  item: 'items.selected',
  loading: 'items.loading',
  posting: 'items.posting',
  page: 'items.page',
  showForm: 'items.showForm',
  total: 'items.total',
  searchQuery: 'items.q',
});
