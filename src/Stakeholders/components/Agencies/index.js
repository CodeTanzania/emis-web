import {
  closeAgencyForm,
  Connect,
  getAgencies,
  openAgencyForm,
  searchAgencies,
  selectAgency,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AgencyForm from './AgencyForm';
import AgencyFilters from './Filters';
import AgencyList from './List';
import NotificationForm from './NotificationForm';
import './styles.css';

/* constants */
const { Search } = Input;

/**
 * @class
 * @name Agencies
 * @description Render agency list which have search box, actions and agency list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Agencies extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedAgencies: [],
    notificationBody: undefined,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    agencies: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    agency: PropTypes.shape({ name: PropTypes.string }),
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string,
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    agency: null,
    searchQuery: undefined,
  };

  componentDidMount() {
    getAgencies();
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
   * @name openAgencyForm
   * @description Open agency form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openAgencyForm = () => {
    openAgencyForm();
  };

  /**
   * @function
   * @name openAgencyForm
   * @description close agency form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeAgencyForm = () => {
    closeAgencyForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchAgencies
   * @description Search Agencies List based on supplied filter word
   *
   * @param {Object} event - Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchAgencies = event => {
    searchAgencies(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {Object} agency agency to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = agency => {
    selectAgency(agency);
    this.setState({ isEditForm: true });
    openAgencyForm();
  };

  /**
   * @function
   * @name openNotificationForm
   * @description Handle on notify agencies
   *
   * @param {Object[]} agencies List of agencies selected to be notified
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = agencies => {
    this.setState({
      selectedAgencies: agencies,
      showNotificationForm: true,
    });
  };

  /**
   * @function
   * @name handleShare
   * @description Handle share single agency action
   *
   * @param {Object} agency  to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleShare = agency => {
    const message = `${agency.name}\nMobile: ${agency.mobile}\nEmail: ${
      agency.email
    }`;

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name handleBulkShare
   * @description Handle share multiple agencies
   *
   * @param {Object[]} agencies agencies list to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleBulkShare = agencies => {
    const agencyList = agencies.map(
      agency =>
        `${agency.name}\nMobile: ${agency.mobile}\nEmail: ${agency.email}`
    );

    const message = agencyList.join('\n\n\n');

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name closeNotificationForm
   * @description Handle on notify agencies
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

  render() {
    const {
      agencies,
      agency,
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
      selectedAgencies,
      notificationBody,
    } = this.state;
    return (
      <div className="Agencies">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for agencies here ..."
              onChange={this.searchAgencies}
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
              title="Add New Agency"
              onClick={this.openAgencyForm}
            >
              New Agency
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <AgencyList
          total={total}
          page={page}
          agencies={agencies}
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
          title="Filter Agencies"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          width="50%"
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <AgencyFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* Notification Modal modal */}
        <Modal
          title="Share Agencies"
          visible={showNotificationForm}
          onCancel={this.closeNotificationForm}
          footer={null}
          destroyOnClose
          maskClosable={false}
          width="40%"
        >
          <NotificationForm
            onCancel={this.closeNotificationForm}
            selectedAgencies={selectedAgencies}
            body={notificationBody}
          />
        </Modal>
        {/* end Notification modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Agency' : 'Add New Agency'}
          visible={showForm}
          width="50%"
          footer={null}
          onCancel={this.closeAgencyForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <AgencyForm
            posting={posting}
            isEditForm={isEditForm}
            agency={agency}
            onCancel={this.closeAgencyForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Agencies, {
  agencies: 'agencies.list',
  agency: 'agencies.selected',
  loading: 'agencies.loading',
  posting: 'agencies.posting',
  page: 'agencies.page',
  showForm: 'agencies.showForm',
  total: 'agencies.total',
  searchQuery: 'agencies.q',
});
