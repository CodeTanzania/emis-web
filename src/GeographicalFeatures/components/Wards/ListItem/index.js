import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component } from 'react';
import './styles.css';

/**
 *
 * @class
 * @name WardsListItem
 * @description Single ward list item component. Render single ward details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class WardsListItem extends Component {
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
    const { name, nature, family, type, onEdit } = this.props;
    const { isHovered } = this.state;
    const avatarBackground = randomColor();

    return (
      <div
        className="WardsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: avatarBackground }}>
                {name.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </Col>
          <Col span={5}>{name}</Col>
          <Col span={6}>{nature}</Col>
          <Col span={4}>{type}</Col>
          <Col span={4}>{family}</Col>
          <Col span={3}>
            {isHovered && (
              <>
                <Icon
                  type="edit"
                  title="Update Ward"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive Ward"
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

WardsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  nature: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default WardsListItem;
