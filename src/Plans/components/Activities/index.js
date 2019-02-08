import {
  closeActivityForm,
  Connect,
  filterActivities,
  getActivities,
  openActivityForm,
  searchActivities,
  selectActivity,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ActivityForm from './ActivityForm';
import ActivityFilters from './Filters';
import ActivitiesList from './List';
import NotificationForm from './NotificationForm';
import './styles.css';

const { Search } = Input;

/**
 * Render activity list which have search box, actions and activity list
 *
 * @class
 * @name ActivitiesList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Activities extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedActivities: [],
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    activities: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    activity: PropTypes.shape({ name: PropTypes.string }),
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  };

  static defaultProps = {
    activity: null,
  };

  componentDidMount() {
    const { match } = this.props;
    if (match.params.planId) {
      filterActivities({ plan: match.params.planId }); // eslint-disable-line
    } else {
      getActivities();
    }
  }

  /**
   * Open filters modal by setting it's visible property to false via state
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
   * Open activity form
   *
   * @function
   * @name openActivityForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openActivityForm = () => {
    openActivityForm();
  };

  /**
   * close activity form
   *
   * @function
   * @name openActivityForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeActivityForm = () => {
    closeActivityForm();
    this.setState({ isEditForm: false });
  };

  /**
   * Search Activities List based on supplied filter word
   *
   * @function
   * @name searchActivities
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchActivities = event => {
    searchActivities(event.target.value);
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
  handleEdit = activity => {
    selectActivity(activity);
    this.setState({ isEditForm: true });
    openActivityForm();
  };

  /**
   * Handle on notify activities
   *
   * @function
   * @name openNotificationForm
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = activities => {
    this.setState({
      selectedActivities: activities,
      showNotificationForm: true,
    });
  };

  /**
   * Handle on notify activities
   *
   * @function
   * @name closeNotificationForm
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeNotificationForm = () => {
    this.setState({ showNotificationForm: false });
  };

  /**
   * Reset isEditForm state to false when modal is closed
   *
   * @function
   * @name handleAfterCloseForm
   *
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      activities,
      activity,
      loading,
      posting,
      page,
      showForm,
      total,
    } = this.props;
    const {
      showFilters,
      isEditForm,
      showNotificationForm,
      selectedActivities,
    } = this.state;
    return (
      <div className="ActivitiesList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for activities here ..."
              onChange={this.searchActivities}
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
              title="Add New Activity"
              onClick={this.openActivityForm}
            >
              New Activity
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <ActivitiesList
          total={total}
          page={page}
          activities={activities}
          loading={loading}
          onEdit={this.handleEdit}
          onFilter={this.openFiltersModal}
          onNotify={this.openNotificationForm}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Activities"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <ActivityFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* Notification Modal modal */}
        <Modal
          title="Notify Activities"
          visible={showNotificationForm}
          onCancel={this.closeNotificationForm}
          footer={null}
          destroyOnClose
          maskClosable={false}
          width="40%"
        >
          <NotificationForm
            onCancel={this.closeNotificationForm}
            selectedActivities={selectedActivities}
          />
        </Modal>
        {/* end Notification modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Activity' : 'Add New Activity'}
          visible={showForm}
          footer={null}
          onCancel={this.closeActivityForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <ActivityForm
            posting={posting}
            isEditForm={isEditForm}
            activity={activity}
            onCancel={this.closeActivityForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(withRouter(Activities), {
  activities: 'activities.list',
  activity: 'activities.selected',
  loading: 'activities.loading',
  posting: 'activities.posting',
  page: 'activities.page',
  showForm: 'activities.showForm',
  total: 'activities.total',
  activePlan: 'plans.selected',
});
