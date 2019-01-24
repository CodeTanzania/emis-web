import { Connect, getRoles } from '@codetanzania/emis-api-states';
import { Input, List } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import RoleListItem from './RoleListItem';
import RolesListHeader from './ListHeader';
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
  };

  componentWillMount() {
    getRoles();
  }

  render() {
    const { roles, loading, total } = this.props;
    return (
      <div className="RoleList">
        {/* search input component */}
        <Search
          size="large"
          placeholder="Search for roles here ..."
          className="searchBox"
        />
        {/* end search input component */}
        {/* list header */}
        <RolesListHeader total={total} />
        {/* end list header */}
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
  total: 'roles.total',
});
