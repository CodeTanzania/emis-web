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
const ListItemActions = ({ edit, share, archive, transfer, adjust }) => (
  <Dropdown
    overlay={
      <Menu>
        {edit && (
          <Menu.Item key="edit" onClick={edit.onClick} title={edit.title}>
            <Icon type="edit" /> {edit.name}
          </Menu.Item>
        )}

        {share && (
          <Menu.Item key="share" onClick={share.onClick} title={share.title}>
            <Icon type="share-alt" /> {share.name}
          </Menu.Item>
        )}

        {archive && (
          <Menu.Item
            key="archive"
            onClick={archive.onClick}
            title={archive.title}
          >
            <Icon type="delete" /> {archive.name}
          </Menu.Item>
        )}

        {transfer && (
          <Menu.Item
            key="transfer"
            onClick={transfer.onClick}
            title={transfer.title}
          >
            <Icon type="swap" /> {transfer.name}
          </Menu.Item>
        )}

        {adjust && (
          <Menu.Item
            key="transfer"
            onClick={adjust.onClick}
            title={adjust.title}
          >
            <Icon type="diff" /> {adjust.name}
          </Menu.Item>
        )}
      </Menu>
    }
    trigger={['click']}
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
  edit: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
  }),
  share: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
  }),
  archive: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
  }),
  transfer: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
  }),
  adjust: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
  }),
};

ListItemActions.defaultProps = {
  edit: null,
  share: null,
  archive: null,
  transfer: null,
  adjust: null,
};

export default ListItemActions;
