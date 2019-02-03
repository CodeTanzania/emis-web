import { Icon, Avatar, Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single warehouse list item component.
 * Render single warehouse details
 *
 * @class
 * @name WarehouseListItem
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.level
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class WarehouseListItem extends Component {
  /* props validation */
  static propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
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
    const { name, level, onEdit } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="WarehouseListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar>{name.slice(0, 1)}</Avatar>
            )}
          </Col>
          <Col span={9}>{name}</Col>
          <Col span={10}>{level}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update warehouse"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive warehouse"
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

export default WarehouseListItem;
