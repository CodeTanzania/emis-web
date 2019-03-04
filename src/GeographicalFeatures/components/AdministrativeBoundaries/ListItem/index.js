import { Avatar, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 *
 * @class
 * @name AdminstrativeBoundaryListItem
 * @description Single adminstrative boundary list item component.
 * Render single adminstrative boundary details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdminstrativeBoundaryListItem extends Component {
  /* props validation */
  static propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
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
    const { name, level } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="AdminstrativeBoundaryListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            <Avatar />
          </Col>
          <Col span={9}>{name}</Col>
          <Col span={10}>{level}</Col>
          <Col span={3}>{isHovered && <Fragment />}</Col>
        </Row>
      </div>
    );
  }
}

export default AdminstrativeBoundaryListItem;
