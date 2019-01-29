import { Connect, getRoles } from '@codetanzania/emis-api-states';
import { Input, Col, Row, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RoleFilters from './Filters';
import RolesActionBar from './ActionBar';
import RoleList from './List';
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
  };

  propTypes = {
    loading: PropTypes.bool.isRequired,
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

  render() {
    const { roles, loading, total, page } = this.props;
    const { showFilters } = this.state;
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
        <RoleList roles={roles} loading={loading} />
        {/* end list */}
        <Modal
          title="Filter Roles"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
        >
          <RoleFilters onCancel={this.closeFiltersModal} />
        </Modal>
      </div>
    );
  }
}

export default Connect(Roles, {
  roles: 'roles.list',
  loading: 'roles.loading',
  page: 'roles.page',
  total: 'roles.total',
});
