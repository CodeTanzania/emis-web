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
import AlertForm from './Form';
import AlertFilters from './Filters';
import AlertList from './List';
import './styles.css';

/* constants */
const { Search } = Input;

/**
 * @class
 * @name Alerts
 * @description Render alert list which have search box, actions and alert list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Alerts extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
  };

  componentDidMount() {
    getAlerts();
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
   * @name openAlertForm
   * @description Open alert form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openAlertForm = () => {
    openAlertForm();
  };

  /**
   * @function
   * @name openAlertForm
   * @description close alert form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeAlertForm = () => {
    closeAlertForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchAlerts
   * @description Search Alerts List based on supplied filter word
   *
   * @param {object} event - Event instance
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
      alerts,
      alert,
      loading,
      posting,
      page,
      showForm,
      searchQuery,
      total,
    } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="Alerts">
        <Row>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for alerts here ..."
              onChange={this.searchAlerts}
              allowClear
              value={searchQuery}
              className="searchBox"
            />
            {/* end search input component */}
          </Col>

          {/* primary actions */}
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Row type="flex" justify="end">
              <Col xxl={6} xl={6} lg={6} md={8} sm={24} xs={24}>
                <Button
                  type="primary"
                  icon="plus"
                  size="large"
                  title="Add New Alert"
                  onClick={this.openAlertForm}
                  block
                >
                  New Alert
                </Button>
              </Col>
            </Row>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <AlertList
          total={total}
          page={page}
          alerts={alerts}
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
          title="Filter Alerts"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          width="50%"
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <AlertFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}
        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Alert' : 'Add New Alert'}
          visible={showForm}
          width="50%"
          footer={null}
          onCancel={this.closeAlertForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <AlertForm
            posting={posting}
            isEditForm={isEditForm}
            alert={alert}
            onCancel={this.closeAlertForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

Alerts.propTypes = {
  loading: PropTypes.bool.isRequired,
  posting: PropTypes.bool.isRequired,
  alerts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  alert: PropTypes.shape({ name: PropTypes.string }),
  page: PropTypes.number.isRequired,
  showForm: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string,
  total: PropTypes.number.isRequired,
};

Alerts.defaultProps = {
  alert: null,
  searchQuery: undefined,
};

export default Connect(Alerts, {
  alerts: 'alerts.list',
  alert: 'alerts.selected',
  loading: 'alerts.loading',
  posting: 'alerts.posting',
  page: 'alerts.page',
  showForm: 'alerts.showForm',
  total: 'alerts.total',
  searchQuery: 'alerts.q',
});
