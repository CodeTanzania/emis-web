import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
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
    warehouseName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    uom: PropTypes.string.isRequired,
    owner: PropTypes.shape({ name: PropTypes.string }).isRequired,
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

  render() {
    const {
      itemName,
      warehouseName,
      color,
      quantity,
      owner,
      onEdit,
      uom,
    } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="StockListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: color }}>
                {itemName.toUpperCase().charAt(0)}
              </Avatar>
            )}
          </Col>
          <Col span={5}>{owner}</Col>
          <Col span={5}>{itemName}</Col>
          <Col span={5}>{`${quantity} ${uom}`}</Col>
          <Col span={5}>{warehouseName}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Stock"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="share-alt"
                  title="Share Stock"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive Stock"
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

export default StockListItem;
