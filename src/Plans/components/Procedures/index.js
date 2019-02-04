import {
  closeProcedureForm,
  Connect,
  getProcedures,
  openProcedureForm,
  searchProcedures,
  selectProcedure,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProcedureFilters from './Filters';
import ProceduresList from './List';
import NotificationForm from './NotificationForm';
import ProcedureForm from './ProcedureForm';
import './styles.css';

const { Search } = Input;

/**
 * Render procedure list which have search box, actions and procedure list
 *
 * @class
 * @name ProceduresList
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
  };

  static defaultProps = {
    procedure: null,
  };

  componentDidMount() {
    getProcedures();
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
   * Open procedure form
   *
   * @function
   * @name openProcedureForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openProcedureForm = () => {
    openProcedureForm();
  };

  /**
   * close procedure form
   *
   * @function
   * @name openProcedureForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeProcedureForm = () => {
    closeProcedureForm();
    this.setState({ isEditForm: false });
  };

  /**
   * Search Procedures List based on supplied filter word
   *
   * @function
   * @name searchProcedures
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchProcedures = event => {
    searchProcedures(event.target.value);
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
  handleEdit = procedure => {
    selectProcedure(procedure);
    this.setState({ isEditForm: true });
    openProcedureForm();
  };

  /**
   * Handle on notify procedures
   *
   * @function
   * @name openNotificationForm
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
   * Handle on notify procedures
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

export default Connect(Procedures, {
  procedures: 'procedures.list',
  procedure: 'procedures.selected',
  loading: 'procedures.loading',
  posting: 'procedures.posting',
  page: 'procedures.page',
  showForm: 'procedures.showForm',
  total: 'procedures.total',
});
