import { Avatar, Checkbox, Col, Icon, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import randomColor from 'randomcolor';
import './styles.css';

const { confirm } = Modal;

/**
 * @class
 * @name RoleListItem
 * @description Single role list item component. Render single role details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class RoleListItem extends Component {
  state = {
    isHovered: false,
  };

  /* props validation */
  static propTypes = {
    abbreviation: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on mouse enter role list item
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  /**
   * @function
   * @name handleMouseLeave
   * @description Handle on mouse leave role list item
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  /**
   * @function
   * @name handleToggleSelect
   * @description Handle Toggling List Item checkbox
   *
   * @param {Object} event - Event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleToggleSelect = event => {
    const { isSelected } = this.state;
    const { onSelectItem, onDeselectItem } = this.props;

    this.setState({ isSelected: !isSelected });
    if (event.target.checked) {
      onSelectItem();
    } else {
      onDeselectItem();
    }
  };

  /**
   * @function
   * @name showArchiveConfirm
   * @description show confirm modal before archiving a role
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  showArchiveConfirm = () => {
    const { name, onArchive } = this.props;
    confirm({
      title: `Are you sure you want to archive ${name} ?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onArchive();
      },
    });
  };

  render() {
    const { abbreviation, name, description, onEdit } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    let sideComponent = null;
    const avatarBackground = randomColor();

    if (isSelected) {
      sideComponent = (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      );
    } else {
      sideComponent = isHovered ? (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      ) : (
        <Avatar style={{ backgroundColor: avatarBackground }}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
      );
    }

    return (
      <div
        className="RoleListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent}</Col>
          <Col span={7}>{name}</Col>
          <Col span={3}>{abbreviation}</Col>
          <Col span={10}>{description}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Role"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive Role"
                  className="actionIcon"
                  onClick={this.showArchiveConfirm}
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default RoleListItem;
