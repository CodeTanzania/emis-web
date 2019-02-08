import {
  Connect,
  getRoles,
  openRoleForm,
  selectRole,
  closeRoleForm,
} from '@codetanzania/emis-api-states';
import { Input, Col, Row, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RoleFilters from './Filters';
import RolesActionBar from './ActionBar';
import RoleList from './List';
import RoleForm from './Form';
import './styles.css';

const { Search } = Input;

/**
 * Render role module which has search box, actions and list of roles
 *
 * @class
 * @name Roles
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Roles extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
  };

  static propTypes = {
    showForm: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    role: PropTypes.shape({
      name: PropTypes.string,
      abbreviation: PropTypes.string,
      description: PropTypes.string,
    }),
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        abbreviation: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  static defaultProps = {
    role: null,
  };

  componentWillMount() {
    getRoles();
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
   * Open role form
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
    openRoleForm();
  };

  /**
   * close role form
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
    closeRoleForm();
    this.setState({ isEditForm: false });
  };

  /**
   * Search Roles List based on supplied filter word
   *
   * @function
   * @name searchRoles
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchRoles = event => {
    getRoles({ q: event.target.value });
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
  handleEdit = role => {
    selectRole(role);
    this.setState({ isEditForm: true });
    openRoleForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const { roles, loading, total, page, showForm, posting, role } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="RoleList">
        <Row>
          <Col span={12}>
            <Search
              size="large"
              placeholder="Search for roles here ..."
              onChange={this.searchRoles}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Role"
              onClick={this.openForm}
            >
              New Role
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <RolesActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}
        {/* list starts */}
        <RoleList roles={roles} loading={loading} onEdit={this.handleEdit} />
        {/* end list */}

        {/* filter modal */}
        <Modal
          title="Filter Roles"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          maskClosable={false}
          destroyOnClose
          footer={null}
        >
          <RoleFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Role' : 'Add New Role'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <RoleForm
            posting={posting}
            isEditForm={isEditForm}
            role={role}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Roles, {
  roles: 'roles.list',
  role: 'roles.selected',
  showForm: 'roles.showForm',
  posting: 'roles.posting',
  loading: 'roles.loading',
  page: 'roles.page',
  total: 'roles.total',
});
