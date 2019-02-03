import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single region list item component. Render single region details
 *
 * @class
 * @name RegionsListItem
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
class RegionsListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { name, category, country, type, onEdit } = this.props;
    const { isHovered } = this.state;
    const avatarBackground = randomColor();

    return (
      <div
        className="RegionsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: avatarBackground }}>
                {name.charAt(0).toUpperCase()}{' '}
              </Avatar>
            )}
          </Col>
          <Col span={5}>{name}</Col>
          <Col span={6}>{category}</Col>
          <Col span={4}>{type}</Col>
          <Col span={4}>{country}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Region"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive Region"
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

export default RegionsListItem;
