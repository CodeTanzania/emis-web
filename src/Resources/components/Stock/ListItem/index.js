import { Avatar, Checkbox, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ListItemActions from '../../../../components/ListItemActions';
import './styles.css';

/**
 * @class
 * @name StockListItem
 * @description Single stock list item component. Render single stock details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class StockListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    itemName: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onAdjust: PropTypes.func.isRequired,
    warehouseName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    uom: PropTypes.string.isRequired,
    owner: PropTypes.shape({ name: PropTypes.string }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
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
   * @description Handle Toggling List Item checkbox
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

  render() {
    const {
      itemName,
      warehouseName,
      color,
      quantity,
      owner,
      uom,
      isSelected,
      onEdit,
      onAdjust,
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
          {itemName.toUpperCase().charAt(0)}
        </Avatar>
      );
    }
    return (
      <div
        className="StockListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent} </Col>
          <Col span={5}>{owner}</Col>
          <Col span={5}>{itemName}</Col>
          <Col span={5}>{`${quantity} ${uom}`}</Col>
          <Col span={5}>{warehouseName}</Col>
          <Col span={3}>
            {isHovered && (
              <ListItemActions
                edit={{
                  name: 'Edit Stock',
                  title: 'Update stock details',
                  onClick: onEdit,
                }}
                transfer={{
                  name: 'Transfer Stock',
                  title: 'Move stock to another warehouse',
                }}
                adjust={{
                  name: 'Adjust Stock',
                  title: 'Adjust stock quantity',
                  onClick: onAdjust,
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default StockListItem;
