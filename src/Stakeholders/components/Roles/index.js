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
 * @class
 * @name Roles
 * @description Render role module which has search box, actions and list of roles
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
   * @name openForm
   * @description Open role form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openRoleForm();
  };

  /**
   * @function
   * @name openForm
   * @description close role form
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
   * @function
   * @name searchRoles
   * @description Search Roles List based on supplied filter word
   *
   * @param {Object} event Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchRoles = event => {
    getRoles({ q: event.target.value });
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {Object} role - role to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = role => {
    selectRole(role);
    this.setState({ isEditForm: true });
    openRoleForm();
  };

  /**
   * @function
   * @name handleAfterCloseForm
   * @description Performs after close form cleanups
   *
   * @version 0.1.0
   * @since 0.1.0
   */
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
