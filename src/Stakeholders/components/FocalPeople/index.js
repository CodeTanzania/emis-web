import { httpActions } from '@codetanzania/emis-api-client';
import {
  closeFocalPersonForm,
  Connect,
  getFocalPeople,
  openFocalPersonForm,
  searchFocalPeople,
  selectFocalPerson,
} from '@codetanzania/emis-api-states';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import NotificationForm from '../../../components/NotificationForm';
import Topbar from '../../../components/Topbar';
import FocalPersonFilters from './Filters';
import FocalPersonForm from './Form';
import FocalPeopleList from './List';
import './styles.css';

/* constants */
const {
  getFocalPeople: getFocalPeopleFromAPI,
  getJurisdictions,
  getPartyGroups,
  getRoles,
  getAgencies,
} = httpActions;

/**
 * @class
 * @name FocalPeople
 * @description Render focalPerson list which have search box, actions and focalPerson list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class FocalPeople extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedFocalPeople: [],
    notificationBody: undefined,
    cached: null,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    focalPeople: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    focalPerson: PropTypes.shape({ name: PropTypes.string }),
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string,
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    focalPerson: null,
    searchQuery: undefined,
  };

  componentDidMount() {
    getFocalPeople();
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
   * @name openFocalPersonForm
   * @description Open focalPerson form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFocalPersonForm = () => {
    openFocalPersonForm();
  };

  /**
   * @function
   * @name openFocalPersonForm
   * @description close focalPerson form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFocalPersonForm = () => {
    closeFocalPersonForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchFocalPeople
   * @description Search FocalPeople List based on supplied filter word
   *
   * @param {object} event - Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchFocalPeople = event => {
    searchFocalPeople(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} focalPerson focalPerson to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = focalPerson => {
    selectFocalPerson(focalPerson);
    this.setState({ isEditForm: true });
    openFocalPersonForm();
  };

  /**
   * @function
   * @name handleShare
   * @description Handle share single focalPerson action
   *
   * @param {object} focalPerson focalPerson to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleShare = focalPerson => {
    const message = `${focalPerson.name}\nMobile: ${
      // eslint-disable-line
      focalPerson.mobile
    }\nEmail: ${focalPerson.email}`;

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name handleBulkShare
   * @description Handle share multiple focal People
   *
   * @param {object[]} focalPeople focal People list to be shared
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleBulkShare = focalPeople => {
    const focalPersonList = focalPeople.map(
      focalPerson =>
        `${focalPerson.name}\nMobile: ${focalPerson.mobile}\nEmail: ${
          // eslint-disable-line
          focalPerson.email
        }`
    );

    const message = focalPersonList.join('\n\n\n');

    this.setState({ notificationBody: message, showNotificationForm: true });
  };

  /**
   * @function
   * @name openNotificationForm
   * @description Handle on notify focalPeople
   *
   * @param {object[]} focalPeople List of focalPeople selected to be notified
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = focalPeople => {
    this.setState({
      selectedFocalPeople: focalPeople,
      showNotificationForm: true,
    });
  };

  /**
   * @function
   * @name closeNotificationForm
   * @description Handle on notify focalPeople
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
      focalPeople,
      focalPerson,
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
      selectedFocalPeople,
      notificationBody,
      cached,
    } = this.state;
    return (
      <Fragment>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for focal people here ...',
            onChange: this.searchFocalPeople,
            value: searchQuery,
          }}
          actions={[
            {
              label: 'New Focal Person',
              icon: 'plus',
              size: 'large',
              title: 'Add New Focal Person',
              onClick: this.openFocalPersonForm,
            },
          ]}
        />
        {/* end Topbar */}

        <div className="FocalPeopleList">
          {/* list starts */}
          <FocalPeopleList
            total={total}
            page={page}
            focalPeople={focalPeople}
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
            title="Filter Focal People"
            visible={showFilters}
            onCancel={this.closeFiltersModal}
            footer={null}
            destroyOnClose
            maskClosable={false}
            className="FormModal"
          >
            <FocalPersonFilters
              onCancel={this.closeFiltersModal}
              cached={cached}
              onCache={this.handleOnCachedValues}
              onClearCache={this.handleClearCachedValues}
            />
          </Modal>
          {/* end filter modal */}

          {/* Notification Modal modal */}
          <Modal
            title="Notify Focal People"
            visible={showNotificationForm}
            onCancel={this.closeNotificationForm}
            footer={null}
            destroyOnClose
            maskClosable={false}
            className="FormModal"
            afterClose={this.handleAfterCloseNotificationForm}
          >
            <NotificationForm
              recipients={selectedFocalPeople}
              onSearchRecipients={getFocalPeopleFromAPI}
              onSearchJurisdictions={getJurisdictions}
              onSearchGroups={getPartyGroups}
              onSearchAgencies={getAgencies}
              onSearchRoles={getRoles}
              body={notificationBody}
              onCancel={this.closeNotificationForm}
            />
          </Modal>
          {/* end Notification modal */}

          {/* create/edit form modal */}
          <Modal
            title={isEditForm ? 'Edit Focal Person' : 'Add New Focal Person'}
            visible={showForm}
            className="FormModal"
            footer={null}
            onCancel={this.closeFocalPersonForm}
            destroyOnClose
            maskClosable={false}
            afterClose={this.handleAfterCloseForm}
          >
            <FocalPersonForm
              posting={posting}
              isEditForm={isEditForm}
              focalPerson={focalPerson}
              onCancel={this.closeFocalPersonForm}
            />
          </Modal>
          {/* end create/edit form modal */}
        </div>
      </Fragment>
    );
  }
}

export default Connect(FocalPeople, {
  focalPeople: 'focalPeople.list',
  focalPerson: 'focalPeople.selected',
  loading: 'focalPeople.loading',
  posting: 'focalPeople.posting',
  page: 'focalPeople.page',
  showForm: 'focalPeople.showForm',
  total: 'focalPeople.total',
  searchQuery: 'focalPeople.q',
});
