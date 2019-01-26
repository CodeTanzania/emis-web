import { Icon, Avatar, Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single  list item component.
 * Render single item details
 *
 * @class
 * @name ItemsListItem
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.type
 * @param {string} props.description
 * @param {string} props.color
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemsListItem extends Component {
  /* props validation */
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
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
    const { name, type, description, color } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="ItemsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: color }}>
                {name.slice(0, 1)}
              </Avatar>
            )}
          </Col>
          <Col span={6}>{name}</Col>
          <Col span={6}>{type}</Col>
          <Col span={8}>{description}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon type="edit" title="Update item" className="actionIcon" />
                <Icon
                  type="database"
                  title="Archive item"
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

export default ItemsListItem;
