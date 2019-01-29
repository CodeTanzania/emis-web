import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single subward list item component. Render single subward details
 *
 * @class
 * @name SubwardsListItem
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
class SubwardsListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { name, category, country, type } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="SubwardsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar>{name.charAt(0)}</Avatar>
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
                  title="Update Subward"
                  className="actionIcon"
                />
                <Icon
                  type="share-alt"
                  title="Share Subward"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive Subward"
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

export default SubwardsListItem;
