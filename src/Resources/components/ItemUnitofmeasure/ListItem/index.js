import { Avatar, Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ListItemActions from '../../../../components/ListItemActions';
import './styles.css';

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
    itemName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
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

  render() {
    const { itemName, type, quantity, cost, color } = this.props;
    const { isHovered } = this.state;
    let sideComponent = null;

    if (itemName) {
      sideComponent = <Checkbox className="Checkbox" />;
    } else {
      sideComponent = isHovered ? (
        <Checkbox className="Checkbox" />
      ) : (
        <Avatar style={{ backgroundColor: color }}>
          {itemName.toUpperCase().charAt(0)}
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
          <Col span={6}>{itemName}</Col>
          <Col span={5}>{type}</Col>
          <Col span={5}>{quantity}</Col>
          <Col span={4}>{cost}</Col>
          <Col span={3}>
            {isHovered && (
              <ListItemActions
                edit={{
                  name: 'Edit Item unit of measure',
                  title: 'Update Item unit of measure Details',
                }}
                archive={{
                  name: 'Archive Item unit of measure',
                  title:
                    'Remove Role from the list of active Item unit of measure',
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
