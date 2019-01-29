import {
  closeStakeholderForm,
  Connect,
  getStakeholders,
  openStakeholderForm,
  searchStakeholders,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContactsActionBar from './ActionBar';
import ContactFilters from './Filters';
import ContactForm from './Form';
import ContactsList from './List';
import './styles.css';

const { Search } = Input;

/**
 * Render contact list which have search box, actions and contact list
 *
 * @class
 * @name ContactsList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Contacts extends Component {
  state = {
    showFilters: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getStakeholders();
  }

  /**
   * open filters modal by setting it's visible property to false via state
   *
   * @function
   * @name openFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * Close filters modal by setting it's visible property to false via state
   *
   * @function
   * @name closeFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * Open contact form
   *
   * @function
   * @name openContactForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openContactForm = () => {
    openStakeholderForm();
  };

  /**
   * close contact form
   *
   * @function
   * @name openContactForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeContactForm = () => {
    closeStakeholderForm();
  };

  /**
   * Search Contacts List based on supplied filter word
   *
   * @function
   * @name searchContacts
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchContacts = event => {
    searchStakeholders(event.target.value);
  };

  render() {
    const { contacts, loading, posting, page, showForm, total } = this.props;
    const { showFilters } = this.state;
    return (
      <div className="ContactsList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for stakeholders here ..."
              onChange={this.searchContacts}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Contact"
              onClick={this.openContactForm}
            >
              New Contact
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <ContactsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}
        {/* list starts */}
        <ContactsList contacts={contacts} loading={loading} />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Contacts"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
        >
          <ContactFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* create/edit form modal */}
        <Modal
          title="Add New Contact"
          visible={showForm}
          footer={null}
          onCancel={this.closeContactForm}
          destroyOnClose
        >
          <ContactForm posting={posting} />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Contacts, {
  contacts: 'stakeholders.list',
  loading: 'stakeholders.loading',
  posting: 'stakeholders.posting',
  page: 'stakeholders.page',
  total: 'stakeholders.total',
  showForm: 'stakeholders.showForm',
});
