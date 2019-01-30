import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import RoleListHeader from '../ListHeader';
import RoleListItem from '../ListItem';

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
const RoleList = ({ roles, loading }) => (
  <Fragment>
    <RoleListHeader />
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
  </Fragment>
);

RoleList.propTypes = {
  loading: PropTypes.bool.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      abbreviation: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default RoleList;
