import { Connect, getRoles } from '@codetanzania/emis-api-states';
import { Input, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
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

  render() {
    const { roles, loading, total, page } = this.props;
    return (
      <div className="RoleList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for roles here ..."
              onChange={({ target: { value } }) => getRoles({ q: value })}
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
        <RolesActionBar total={total} page={page} />
        {/* end list action bar */}
        {/* list starts */}
        <RoleList roles={roles} loading={loading} />
        {/* end list */}
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
