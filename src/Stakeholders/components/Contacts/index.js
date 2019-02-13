import {
  closeStakeholderForm,
  Connect,
  getStakeholders,
  openStakeholderForm,
  selectStakeholder,
  searchStakeholders,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContactForm from './ContactForm';
import ContactFilters from './Filters';
import ContactsList from './List';
import NotificationForm from './NotificationForm';
import './styles.css';

const { Search } = Input;

/**
 * @class
 * @name ContactsList
 * @description Render contact list which have search box, actions and contact list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Contacts extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedContacts: [],
    notificationBody: undefined,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    contact: PropTypes.shape({ name: PropTypes.string }),
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string,
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    contact: null,
    searchQuery: undefined,
  };

  componentDidMount() {
    getStakeholders();
  }

  /**
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property to false via state
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
   * @description Close filters modal by setting it's visible property to false via state
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * @function
   * @name openContactForm
   * @description Open contact form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openContactForm = () => {
    openStakeholderForm();
  };

  /**
   * @function
   * @name openContactForm
   * @description close contact form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeContactForm = () => {
    closeStakeholderForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchContacts
   * @description Search Contacts List based on supplied filter word
   *
   * @param {Object} event - Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchContacts = event => {
    searchStakeholders(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {Object} contact contact to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = contact => {
    selectStakeholder(contact);
    this.setState({ isEditForm: true });
    openStakeholderForm();
  };

  /**
   * @function
   * @name handleShare
   * @description Handle share single contact action
   *
   * @param {Object} contact contact to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleShare = contact => {
    const message = `${contact.name}\nMobile: ${contact.mobile}\nEmail: ${
      contact.email
    }`;

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name handleBulkShare
   * @description Handle share multiple contacts
   *
   * @param {Object[]} contacts contacts list to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleBulkShare = contacts => {
    const contactList = contacts.map(
      contact =>
        `${contact.name}\nMobile: ${contact.mobile}\nEmail: ${contact.email}`
    );

    const message = contactList.join('\n\n\n');

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name openNotificationForm
   * @description Handle on notify contacts
   *
   * @param {Object[]} contacts List of contacts selected to be notified
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = contacts => {
    console.log(contacts);
    this.setState({
      selectedContacts: contacts,
      showNotificationForm: true,
    });
  };

  /**
   * @function
   * @name closeNotificationForm
   * @description Handle on notify contacts
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
      contacts,
      contact,
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
      selectedContacts,
      notificationBody,
    } = this.state;
    return (
      <div className="ContactsList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for focal persons here ..."
              onChange={this.searchContacts}
              allowClear
              value={searchQuery}
            />
            {/* end search input component */}
          </Col>

          {/* <Col span={3} offset={1}>
            <Select
              defaultValue="Active"
              style={{ width: 120 }}
              size="large"
              type="primary"
            >
              <Option value="All">All</Option>
              <Option value="Active">Active</Option>
              <Option value="Archived">Archived</Option>
            </Select>
          </Col> */}

          {/* primary actions */}
          <Col span={2} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Focal Person"
              onClick={this.openContactForm}
            >
              New Focal Person
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <ContactsList
          total={total}
          page={page}
          contacts={contacts}
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
          title="Filter Focal Persons"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <ContactFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* Notification Modal modal */}
        <Modal
          title="Notify Focal Persons"
          visible={showNotificationForm}
          onCancel={this.closeNotificationForm}
          footer={null}
          destroyOnClose
          maskClosable={false}
          width="40%"
          afterClose={this.handleAfterCloseNotificationForm}
        >
          <NotificationForm
            onCancel={this.closeNotificationForm}
            recipients={selectedContacts}
            body={notificationBody}
          />
        </Modal>
        {/* end Notification modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Focal Person' : 'Add New Focal Person'}
          visible={showForm}
          width="50%"
          footer={null}
          onCancel={this.closeContactForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <ContactForm
            posting={posting}
            isEditForm={isEditForm}
            contact={contact}
            onCancel={this.closeContactForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Contacts, {
  contacts: 'stakeholders.list',
  contact: 'stakeholders.selected',
  loading: 'stakeholders.loading',
  posting: 'stakeholders.posting',
  page: 'stakeholders.page',
  showForm: 'stakeholders.showForm',
  total: 'stakeholders.total',
  searchQuery: 'stakeholders.q',
});
