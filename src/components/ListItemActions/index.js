import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button, Icon, Menu } from 'antd';
import './styles.css';

/**
 * @function
 * @name ListItemActions
 * @description Render Dropdown component with has actions for list items
 *
 * @param {Object} props props object
 * @param {Function} props.onEdit on edit action callback
 * @param {Function} props.onShare on share action callback
 * @param {Function} props.onArchive on archive action callback
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ListItemActions = ({ onEdit, onShare, onArchive }) => (
  <Dropdown
    overlay={
      <Menu>
        {onEdit && (
          <Menu.Item key="edit" onClick={onEdit} title="edit item">
            <Icon type="edit" /> Edit
          </Menu.Item>
        )}

        {onShare && (
          <Menu.Item key="share" onClick={onShare} title="share item">
            <Icon type="share-alt" /> Share
          </Menu.Item>
        )}

        {onArchive && (
          <Menu.Item key="archive" onClick={onArchive} title="archive item">
            <Icon type="delete" /> Archive
          </Menu.Item>
        )}
      </Menu>
    }
  >
    <Button
      shape="circle"
      size="large"
      icon="more"
      className="ListItemActionsButton"
      title="More actions"
    />
  </Dropdown>
);

/* props validation */
ListItemActions.propTypes = {
  onEdit: PropTypes.func,
  onShare: PropTypes.func,
  onArchive: PropTypes.func,
};

ListItemActions.defaultProps = {
  onEdit: null,
  onShare: null,
  onArchive: null,
};

export default ListItemActions;
