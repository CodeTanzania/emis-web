import { Connect, getRoles } from '@codetanzania/emis-api-states';
import { Input, List, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RoleListItem from './ListItem';
import RolesActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * Render role list which have search box and actions
 *
 * @class
 * @name RoleList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class RoleList extends Component {
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
              placeholder="Search for stakeholders here ..."
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Contact"
            >
              New Contact
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <RolesActionBar total={total} page={page} />
        {/* end list action bar */}
        {/* list starts */}
        <List
          loading={loading}
          dataSource={roles}
          renderItem={role => (
            <RoleListItem
              key={role.abbreviation}
              abbreviation={role.abbreviation}
              name={role.name}
              description={role.description}
            />
          )}
        />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(RoleList, {
  roles: 'roles.list',
  loading: 'roles.loading',
  page: 'roles.page',
  total: 'roles.total',
});
