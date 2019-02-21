import { deleteRole } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import RoleListHeader from '../../../../components/ListHeader';
import { notifyError, notifySuccess } from '../../../../util';
import RolesActionBar from '../ActionBar';
import RoleListItem from '../ListItem';

/* constants */
const headerLayout = [
  { span: 7, header: 'Name' },
  { span: 3, header: 'Abbreviation' },
  { span: 10, header: 'Description' },
];

// eslint-disable-next-line jsdoc/require-returns
/**
 * @class
 * @name RoleList
 * @description Render role list which have search box and actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class RoleList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        abbreviation: PropTypes.string,
        description: PropTypes.string,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onFilter: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
  };

  state = {
    selectedRoles: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnSelectRole
   * @description Handle select a single role action
   *
   * @param {Object} role selected role object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectRole = role => {
    const { selectedRoles } = this.state;
    this.setState({ selectedRoles: concat([], selectedRoles, role) });
  };

  /**
   * @function
   * @name handleOnDeselectRole
   * @description Handle deselect a single role action
   *
   * @param {Object} role roles to be removed from selected roles
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectRole = role => {
    const { selectedRoles } = this.state;
    const selectedList = [...selectedRoles];

    remove(
      selectedList,
      item => item._id === role._id // eslint-disable-line
    );

    this.setState({ selectedRoles: selectedList });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all contacts actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedRoles, selectedPages } = this.state;
    const { roles, page } = this.props;
    const selectedList = [...selectedRoles, ...roles];
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedRoles: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all contacts in a current page
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { roles, page } = this.props;
    const { selectedRoles, selectedPages } = this.state;
    const selectedList = [...selectedRoles];
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    roles.forEach(contact => {
      remove(
        selectedList,
        item => item._id === contact._id // eslint-disable-line
      );
    });

    this.setState({
      selectedRoles: selectedList,
      selectedPages: pages,
    });
  };

  render() {
    const {
      roles,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onNotify,
    } = this.props;
    const { selectedRoles, selectedPages } = this.state;
    const selectedRolesCount = this.state.selectedRoles.length;
    return (
      <Fragment>
        {/* list action bar */}
        <RolesActionBar
          total={total}
          page={page}
          onFilter={onFilter}
          selectedItemCount={selectedRolesCount}
          onNotify={() => {
            onNotify(selectedRoles);
          }}
        />
        {/* end list action bar */}
        <RoleListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        <List
          loading={loading}
          dataSource={roles}
          renderItem={role => (
            <RoleListItem
              key={role.name}
              abbreviation={role.abbreviation}
              name={role.name}
              description={role.description}
              isSelected={
                // eslint-disable-next-line
                map(selectedRoles, item => item._id).includes(role._id)
              }
              onSelectItem={() => {
                this.handleOnSelectRole(role);
              }}
              onDeselectItem={() => {
                this.handleOnDeselectRole(role);
              }}
              onEdit={() => onEdit(role)}
              onArchive={() =>
                deleteRole(
                  role._id, // eslint-disable-line
                  () => {
                    console.log(role._id); // eslint-disable-line
                    notifySuccess('Role was archived successfully');
                  },
                  () => {
                    notifyError(
                      `An Error occurred while archiving role please contact
                   system administrator`
                    );
                  }
                )
              }
            />
          )}
        />
      </Fragment>
    );
  }
}
export default RoleList;
