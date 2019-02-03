import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single district list item component. Render single district details
 *
 * @class
 * @name DistrictsListItem
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.category
 * @param {string} props.type
 * @param {string} props.country
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class DistrictsListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    nature: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    family: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
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
        className="DistrictsListItem"
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
              <Fragment>
                <Icon
                  type="edit"
                  title="Update District"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive District"
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

export default DistrictsListItem;
