import {
  closeAlertForm,
  Connect,
  getAlerts,
  openAlertForm,
  searchAlerts,
  selectAlert,
} from '@codetanzania/emis-api-states';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Topbar from '../../../components/Topbar';
import AlertsFilters from './Filters';
import AlertForm from './Form';
import AlertList from './List';
import './styles.css';

/**
 * @class
 * @name Alerts
 * @description Render alert module which have search box, actions and alert
 * list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Alerts extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
    // showNotificationForm: false,
    // notificationBody: undefined,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    alert: PropTypes.shape({
      event: PropTypes.string,
      category: PropTypes.string,
      urgency: PropTypes.string,
      area: PropTypes.string,
      severity: PropTypes.string,
      certainty: PropTypes.string,
      instruction: PropTypes.string,
      expiredAt: PropTypes.string,
      expectedAt: PropTypes.string,
      _id: PropTypes.string,
    }),
    alerts: PropTypes.arrayOf(
      PropTypes.shape({
        event: PropTypes.string,
        headline: PropTypes.string,
        description: PropTypes.string,
        source: PropTypes.string,
        reportedAt: PropTypes.string,
        expiredAt: PropTypes.string,
        expectedAt: PropTypes.string,
        _id: PropTypes.string,
      })
    ).isRequired,
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    searchQuery: PropTypes.string,
  };

  static defaultProps = {
    alert: null,
    searchQuery: undefined,
  };

  componentDidMount() {
    getAlerts();
  }

  /**
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property
   * to false via state
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
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible property
   *  to false via state
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
   * Open alert form
   *
   * @function
   * @name openForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openAlertForm();
  };

  /**
   * close alert form
   *
   * @function
   * @name openForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeForm = () => {
    closeAlertForm();
    this.setState({ isEditForm: false });
  };

  /**
   * Search Alerts List based on supplied filter word
   *
   * @function
   * @name searchAlerts
   *
   * @param {object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchAlerts = event => {
    searchAlerts(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} alert alert to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = alert => {
    selectAlert(alert);
    this.setState({ isEditForm: true });
    openAlertForm();
  };

  /**
   * @function
   * @name openNotificationForm
   * @description Handle on notify focalPeople
   *
   * @param {Array<object>} alert List of focalPeople selected to be notified
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = () => {
    // this.setState({
    //   showNotificationForm: true,
    // });
  };

  /**
   * @function
   * @name closeNotificationForm
   * @description Handle on notify alert
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeNotificationForm = () => {
    // this.setState({ showNotificationForm: false });
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
    // this.setState({ notificationBody: undefined });
  };

  render() {
    const {
      alerts,
      alert,
      loading,
      posting,
      page,
      searchQuery,
      showForm,
      total,
    } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <Fragment>
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for alert here ...',
            onChange: this.searchAlerts,
            value: searchQuery,
          }}
          actions={[
            {
              label: 'New Alert',
              icon: 'plus',
              size: 'large',
              title: 'Add New Alert',
              onClick: this.openForm,
            },
          ]}
        />
        {/* end Topbar */}

        <div className="Alerts">
          <AlertList
            total={total}
            alerts={alerts}
            page={page}
            loading={loading}
            onEdit={this.handleEdit}
            onFilter={this.openFiltersModal}
            onNotify={this.openNotificationForm}
          />
          {/* end list */}

          {/* filter modal */}
          <Modal
            title="Filter Alerts"
            visible={showFilters}
            onCancel={this.closeFiltersModal}
            destroyOnClose
            maskClosable={false}
            width={800}
            footer={null}
          >
            <AlertsFilters onCancel={this.closeFiltersModal} />
          </Modal>
          {/* end filter modal */}

          {/* create/edit form modal */}
          <Modal
            title={isEditForm ? 'Edit Alert' : 'Add New Alert'}
            visible={showForm}
            footer={null}
            maskClosable={false}
            onCancel={this.closeForm}
            width="60%"
            destroyOnClose
          >
            <AlertForm
              posting={posting}
              onCancel={this.closeForm}
              isEditForm={isEditForm}
              alert={alert}
            />
          </Modal>
          {/* end create/edit form modal */}
        </div>
      </Fragment>
    );
  }
}

export default Connect(Alerts, {
  alerts: 'alerts.list',
  alert: 'alerts.selected',
  loading: 'alerts.loading',
  posting: 'alerts.posting',
  page: 'alerts.page',
  total: 'alerts.total',
  showForm: 'alerts.showForm',
  searchQuery: 'alerts.q',
});
