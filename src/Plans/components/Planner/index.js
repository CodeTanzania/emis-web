import {
  closePlanForm,
  Connect,
  getPlans,
  openPlanForm,
  searchPlans,
  selectPlan,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PlanFilters from './Filters';
import PlansList from './List';
import NotificationForm from './NotificationForm';
import PlanForm from './PlanForm';
import './styles.css';

const { Search } = Input;

/**
 * Render plan list which have search box, actions and plan list
 *
 * @class
 * @name PlansList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Plans extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedPlans: [],
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    plans: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    plan: PropTypes.shape({ name: PropTypes.string }),
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    plan: null,
  };

  componentDidMount() {
    getPlans();
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
   * Open plan form
   *
   * @function
   * @name openPlanForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openPlanForm = () => {
    openPlanForm();
  };

  /**
   * close plan form
   *
   * @function
   * @name openPlanForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closePlanForm = () => {
    closePlanForm();
    this.setState({ isEditForm: false });
  };

  /**
   * Search Plans List based on supplied filter word
   *
   * @function
   * @name searchPlans
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchPlans = event => {
    searchPlans(event.target.value);
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
  handleEdit = plan => {
    selectPlan(plan);
    this.setState({ isEditForm: true });
    openPlanForm();
  };

  /**
   * Handle on notify plans
   *
   * @function
   * @name openNotificationForm
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = plans => {
    this.setState({
      selectedPlans: plans,
      showNotificationForm: true,
    });
  };

  /**
   * Handle on notify plans
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
   * Reset isEditForm state to false after closing modal window
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
    const { plans, plan, loading, posting, page, showForm, total } = this.props;
    const {
      showFilters,
      isEditForm,
      showNotificationForm,
      selectedPlans,
    } = this.state;
    return (
      <div className="PlansList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for plans here ..."
              onChange={this.searchPlans}
            />
            {/* end search input component */}
          </Col>

          {/* primary actions */}
          <Col span={2} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Plan"
              onClick={this.openPlanForm}
            >
              New Plan
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <PlansList
          total={total}
          page={page}
          plans={plans}
          loading={loading}
          onEdit={this.handleEdit}
          onFilter={this.openFiltersModal}
          onNotify={this.openNotificationForm}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Plans"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <PlanFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* Notification Modal modal */}
        <Modal
          title="Notify Plans"
          visible={showNotificationForm}
          onCancel={this.closeNotificationForm}
          footer={null}
          destroyOnClose
          maskClosable={false}
          width="40%"
        >
          <NotificationForm
            onCancel={this.closeNotificationForm}
            selectedPlans={selectedPlans}
          />
        </Modal>
        {/* end Notification modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Plan' : 'Add New Plan'}
          visible={showForm}
          footer={null}
          onCancel={this.closePlanForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <PlanForm
            posting={posting}
            isEditForm={isEditForm}
            plan={plan}
            onCancel={this.closePlanForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Plans, {
  plans: 'plans.list',
  plan: 'plans.selected',
  loading: 'plans.loading',
  posting: 'plans.posting',
  page: 'plans.page',
  showForm: 'plans.showForm',
  total: 'plans.total',
});
