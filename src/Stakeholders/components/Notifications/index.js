import { Connect, getCampaigns } from '@codetanzania/emis-api-states';
import { httpActions } from '@codetanzania/emis-api-client';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import React, { Component, Fragment } from 'react';
import Topbar from '../../../components/Topbar';
import CampaignList from './List';

import './styles.css';
import NotificationForm from '../../../components/NotificationForm';

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
 * @name Campaign
 * @description Render campaign list which have search box, actions and campaign list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Campaign extends Component {
  state = {
    showNotificationForm: false,
    selectedFocalPeople: [],
    notificationBody: undefined,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    campaigns: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    searchQuery: PropTypes.string,
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    searchQuery: undefined,
  };

  componentDidMount() {
    getCampaigns();
  }

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
  openNotificationForm = (focalPeople = []) => {
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
    const { campaigns, loading, page, searchQuery, total } = this.props;
    const {
      showNotificationForm,
      selectedFocalPeople,
      notificationBody,
    } = this.state;
    return (
      <Fragment>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for notifications here ...',
            onChange: this.searchCampaigns,
            value: searchQuery,
          }}
          actions={[
            {
              label: 'New Notification',
              icon: 'plus',
              size: 'large',
              title: 'Create Notification',
              onClick: () => this.openNotificationForm(),
            },
          ]}
        />
        {/* end Topbar */}

        <div className="NotificationList">
          {/* list starts */}
          <CampaignList
            total={total}
            page={page}
            campaigns={campaigns}
            loading={loading}
            onEdit={this.handleEdit}
            onFilter={this.openFiltersModal}
            onNotify={this.openCampaignForm}
          />
          {/* end list */}

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
        </div>
      </Fragment>
    );
  }
}

export default Connect(Campaign, {
  searchQuery: 'campaigns.q',
  campaigns: 'campaigns.list',
  // notification: 'campaign.selected',
  loading: 'campaigns.loading',
  // posting: 'campaign.posting',
  page: 'campaigns.page',
  showForm: 'campaigns.showForm',
  total: 'campaigns.total',
});
