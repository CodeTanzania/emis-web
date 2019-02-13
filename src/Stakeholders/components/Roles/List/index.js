import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import RoleListHeader from '../../../../components/ListHeader';
import RoleListItem from '../ListItem';

/* constants */
const headerLayout = [
  { span: 7, header: 'Name', offset: 1 },
  { span: 3, header: 'Abbreviation' },
  { span: 10, header: 'Description' },
];

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name RoleList
 * @description Render role list which have search box and actions
 *
 * @param {Object} props props object
 * @param {Object[]} props.roles list of roles
 * @param {boolean} props.loading loading state of roles list
 * @param {Function} props.onEdit callaback invoked on edit role
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const RoleList = ({ roles, loading, onEdit }) => (
  <Fragment>
    <RoleListHeader headerLayout={headerLayout} />
    <List
      loading={loading}
      dataSource={roles}
      renderItem={role => (
        <RoleListItem
          key={role.abbreviation}
          abbreviation={role.abbreviation}
          name={role.name}
          description={role.description}
          onEdit={() => onEdit(role)}
        />
      )}
    />
  </Fragment>
);

RoleList.propTypes = {
  loading: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      abbreviation: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default RoleList;
