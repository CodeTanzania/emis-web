import {
  closeAlertForm,
  Connect,
  getAlerts,
  openAlertForm,
  searchAlerts,
  selectAlert,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AlertsActionBar from './ActionBar';
import AlertsFilters from './Filters';
import AlertForm from './Form';
import AlertList from './List';
import './styles.css';

const { Search } = Input;

/**
 * Render alert module which have search box, actions and alert list
 *
 * @class
 * @name Alerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Alerts extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
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
      headline: PropTypes.string,
      expiredAt: PropTypes.string,
      expectedAt: PropTypes.string,
      _id: PropTypes.string,
    }),
    alerts: PropTypes.arrayOf(
      PropTypes.shape({
        headline: PropTypes.string,
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
  };

  static defaultProps = {
    alert: null,
  };

  componentWillMount() {
    getAlerts();
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
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchAlerts = event => {
    searchAlerts(event.target.value);
  };

  /**
   * Handle on Edit action for list item
   *
   * @function
   * @name handleEdit
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = alert => {
    selectAlert(alert);
    this.setState({ isEditForm: true });
    openAlertForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      alerts,
      alert,
      loading,
      posting,
      page,
      showForm,
      total,
    } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="Alerts">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for alerts here ..."
              onChange={this.searchAlerts}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Alert"
              onClick={this.openForm}
            >
              New Alert
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <AlertsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}
        {/* list starts */}
        <AlertList alerts={alerts} loading={loading} onEdit={this.handleEdit} />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Alerts"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
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
});
