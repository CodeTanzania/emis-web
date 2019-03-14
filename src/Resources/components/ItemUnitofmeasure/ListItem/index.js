import { Avatar, Col, Row, Checkbox, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ListItemActions from '../../../../components/ListItemActions';
import './styles.css';

const { confirm } = Modal;

/**
 * @class
 * @name ItemUnitOfMeasureListItem
 * @description Single item unit of measure list item component.
 * Render single item unit of measure list item details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemUnitOfMeasureListItem extends Component {
  /* props validation */
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    maxStockAllowed: PropTypes.number.isRequired,
    minStockAllowed: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
  };

  state = {
    isHovered: false,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description show item actions on hover
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
   * @description hide item actions on hover
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
   * @description Handle toggling list item checkbox
   *
   * @param {Object} event Event object
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
   * @description show confirm modal before archiving a item unit of measure
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
    const {
      name,
      type,
      color,
      maxStockAllowed,
      minStockAllowed,
      isSelected,
      onEdit,
    } = this.props;
    const { isHovered } = this.state;
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
        <Avatar style={{ backgroundColor: color }}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
      );
    }

    return (
      <div
        className="ItemUnitOfMeasureListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent} </Col>
          <Col span={6}>{name}</Col>
          <Col span={5}>{type}</Col>
          <Col span={5}>{maxStockAllowed}</Col>
          <Col span={4}>{minStockAllowed}</Col>
          <Col span={3}>
            {isHovered && (
              <ListItemActions
                edit={{
                  name: 'Edit Item unit of measure',
                  title: 'Update Item unit of measure Details',
                  onClick: onEdit,
                }}
                archive={{
                  name: 'Archive Item unit of measure',
                  title:
                    'Remove Role from the list of active Item unit of measure',
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

export default ItemUnitOfMeasureListItem;
