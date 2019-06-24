import {
  closeProcedureForm,
  Connect,
  filterProcedures,
  getProcedures,
  openProcedureForm,
  searchProcedures,
  selectProcedure,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ProcedureFilters from './Filters';
import ProceduresList from './List';
import NotificationForm from './NotificationForm';
import ProcedureForm from './ProcedureForm';
import './styles.css';

const { Search } = Input;

/**
 * @class
 * @name ProceduresList
 * @description Render procedure list which have search box, actions and procedure list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Procedures extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
    showNotificationForm: false,
    selectedProcedures: [],
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    procedures: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    procedure: PropTypes.shape({ name: PropTypes.string }),
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    match: PropTypes.shape({
      url: PropTypes.string,
      params: PropTypes.shape({ activityId: PropTypes.string }),
    }).isRequired,
  };

  static defaultProps = {
    procedure: null,
  };

  componentDidMount() {
    const { match } = this.props;

    if (match.params.activityId) {
      filterProcedures({ activity: match.params.activityId });
    } else {
      getProcedures();
    }
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
   * @name openProcedureForm
   * @description Open procedure form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openProcedureForm = () => {
    openProcedureForm();
  };

  /**
   * @function
   * @name openProcedureForm
   * @description close procedure form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeProcedureForm = () => {
    closeProcedureForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchProcedures
   * @description Search Procedures List based on supplied filter word
   *
   * @param {object} event  Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchProcedures = event => {
    searchProcedures(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} procedure procedure object to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = procedure => {
    selectProcedure(procedure);
    this.setState({ isEditForm: true });
    openProcedureForm();
  };

  /**
   * @function
   * @name openNotificationForm
   * @description Handle on notify procedures
   *
   * @param {object[]} procedures procedure list
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openNotificationForm = procedures => {
    this.setState({
      selectedProcedures: procedures,
      showNotificationForm: true,
    });
  };

  /**
   * @function
   * @name closeNotificationForm
   * @description Handle on notify procedures
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
   * @description Perform cleanups after closing procedure form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      procedures,
      procedure,
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
      selectedProcedures,
    } = this.state;
    return (
      <div className="ProceduresList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for procedures here ..."
              onChange={this.searchProcedures}
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
              title="Add New Procedure"
              onClick={this.openProcedureForm}
            >
              New Procedure
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <ProceduresList
          total={total}
          page={page}
          procedures={procedures}
          loading={loading}
          onEdit={this.handleEdit}
          onFilter={this.openFiltersModal}
          onNotify={this.openNotificationForm}
        />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Procedures"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <ProcedureFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* Notification Modal modal */}
        <Modal
          title="Notify Procedures"
          visible={showNotificationForm}
          onCancel={this.closeNotificationForm}
          footer={null}
          destroyOnClose
          maskClosable={false}
          width="40%"
        >
          <NotificationForm
            onCancel={this.closeNotificationForm}
            selectedProcedures={selectedProcedures}
          />
        </Modal>
        {/* end Notification modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Procedure' : 'Add New Procedure'}
          visible={showForm}
          footer={null}
          onCancel={this.closeProcedureForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <ProcedureForm
            posting={posting}
            isEditForm={isEditForm}
            procedure={procedure}
            onCancel={this.closeProcedureForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(withRouter(Procedures), {
  procedures: 'procedures.list',
  procedure: 'procedures.selected',
  loading: 'procedures.loading',
  posting: 'procedures.posting',
  page: 'procedures.page',
  showForm: 'procedures.showForm',
  total: 'procedures.total',
});
