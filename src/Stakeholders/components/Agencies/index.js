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
 * @function
 * @name generateShareAgencyContent
 * @description generate agency content to share from agency object
 *
 * @param {object} agency  agency to be converted to string content
 * @returns {string} Message content to be shared
 * @version 0.1.0
 * @since 0.1.0
 */
const generateShareAgencyContent = agency =>
  `${agency.name}\nMobile: ${agency.mobile}\nEmail: ${agency.email}\nWebsite: ${agency.website}\nPhysical Address: ${agency.physicalAddress}\nPostal Address: ${agency.postalAddress}`;

/**
 * @class
 * @name Agencies
 * @description Render agency list which have search box, actions and agency list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Agencies extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedAgencies: [],
    notificationBody: undefined,
    cached: null,
  };

  componentDidMount() {
    getAgencies();
  }

  /**
   * @function
   * @name handleOnCachedValues
   * @description Cached selected values for filters
   *
   * @param {object} cached values to be cached from filter
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnCachedValues = cached => {
    const { cached: previousCached } = this.state;
    const values = { ...previousCached, ...cached };
    this.setState({ cached: values });
  };

  /**
   * @function
   * @name handleClearCachedValues
   * @description Clear cached values
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleClearCachedValues = () => {
    this.setState({ cached: null });
  };

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
   * @param {object} event - Event instance
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
   * @param {object} agency agency to be edited
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
   * @param {object[]} agencies List of agencies selected to be notified
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
   * @param {object} agency  to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleShare = agency => {
    const message = generateShareAgencyContent(agency);

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name handleBulkShare
   * @description Handle share multiple agencies
   *
   * @param {object[]} agencies agencies list to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleBulkShare = agencies => {
    const agencyList = agencies.map(generateShareAgencyContent);

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
      cached,
    } = this.state;

    return (
      <div className="Agencies">
        <Row>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for agencies here ..."
              onChange={this.searchAgencies}
              allowClear
              value={searchQuery}
              className="searchBox"
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
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Row type="flex" justify="end">
              <Col xxl={4} xl={5} lg={7} md={8} sm={24} xs={24}>
                <Button
                  type="primary"
                  icon="plus"
                  size="large"
                  title="Add New Agency"
                  onClick={this.openAgencyForm}
                  block
                >
                  New Agency
                </Button>
              </Col>
            </Row>
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
          <AgencyFilters
            onCancel={this.closeFiltersModal}
            cached={cached}
            onCache={this.handleOnCachedValues}
            onClearCache={this.handleClearCachedValues}
          />
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

Agencies.propTypes = {
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

Agencies.defaultProps = {
  agency: null,
  searchQuery: undefined,
};

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
