import { Icon, Avatar, Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';

/**
 * @class
 * @name IndicatorListItem
 * @description single  indicator list item component.Render single indicator
 * details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IndicatorListItem extends Component {
  // eslint-disable-next-line react/state-in-constructor
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
    const { subject, topic, description, color, onEdit } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="IndicatorListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: color }}>
                {subject.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </Col>
          <Col span={6}>{subject}</Col>
          <Col span={6}>{topic}</Col>
          <Col span={8}>{description}</Col>
          <Col span={3}>
            {isHovered && (
              <>
                <Icon
                  type="edit"
                  title="Update indicator"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive indicator"
                  className="actionIcon"
                />
              </>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

IndicatorListItem.propTypes = {
  subject: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default IndicatorListItem;
