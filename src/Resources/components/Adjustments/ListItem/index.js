import { Icon, Avatar, Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single adjustment list item component.
 * Render single adjustment item details
 *
 * @class
 * @name AdjustmentListItem
 *
 * @param {Object} props
 * @param {string} props.itemName
 *  @param {string} props.warehouseName
 * @param {string} props.type
 * @param {string} props.quantity
 * @param {string} props.cost
 * @param {string} props.reason
 * @param {string} props.color
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdjustmentListItem extends Component {
  /* props validation */
  static propTypes = {
    itemName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    warehouseName: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  };

  state = {
    isHovered: false,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const {
      itemName,
      type,
      warehouseName,
      quantity,
      cost,
      reason,
      color,
    } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="AdjustmentListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: color }}>
                {itemName.slice(0, 1)}
              </Avatar>
            )}
          </Col>
          <Col span={4}>{itemName}</Col>
          <Col span={3}>{type}</Col>
          <Col span={2}>{quantity}</Col>
          <Col span={3}>{cost}</Col>
          <Col span={4}>{reason}</Col>
          <Col span={4}>{warehouseName}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="database"
                  title="Archive adjustment"
                  className="actionIcon"
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AdjustmentListItem;
