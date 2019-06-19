import { Avatar, Checkbox, Col, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import truncate from 'lodash/truncate';
import React, { Component } from 'react';
import ListItemActions from '../../../../components/ListItemActions';
import './styles.css';

/* constants */
const { confirm } = Modal;
const sideSpan = { xxl: 1, xl: 1, lg: 1, md: 2, sm: 3, xs: 3 };
const nameSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 8, xs: 8 };
const typeSpan = { xxl: 5, xl: 5, lg: 4, md: 4, sm: 6, xs: 6 };
const descriptionSpan = { xxl: 10, xl: 10, lg: 10, md: 8, sm: 0, xs: 0 };
const isHoveredSpan = { xxl: 2, xl: 2, lg: 2, md: 2, sm: 3, xs: 3 };

/**
 * @class
 * @name ListItem
 * @description Single list item component.
 * Render single item details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    abbreviation: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onArchive: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on MouseEnter ListItem event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on MouseLeave ListItem event
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
   * @param {object} event - Event object
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
   * @description show confirm modal before archiving a item
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
    const { abbreviation, type, name, description, onEdit } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    const avatarBackground = randomColor();
    let sideComponent = null;

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
          {abbreviation}
        </Avatar>
      );
    }

    return (
      <div
        className="ListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col {...sideSpan}>{sideComponent}</Col>
          <Col {...nameSpan}>{name}</Col>
          <Col {...typeSpan}>{type}</Col>
          <Col {...descriptionSpan} title={description}>
            {truncate(description, { length: 140 })}
          </Col>
          <Col {...isHoveredSpan}>
            {isHovered && (
              <ListItemActions
                edit={{
                  name: 'Edit Item',
                  title: 'Update Item Details',
                  onClick: onEdit,
                }}
                archive={{
                  name: 'Archive Item',
                  title: 'Remove Item from list of active items',
                  onClick: this.showArchiveConfirm,
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ListItem;
