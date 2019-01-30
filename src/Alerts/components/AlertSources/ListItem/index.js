import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single Alert Source list item component. Render single Source details
 *
 * @class
 * @name AlertSourcesListItem
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.url
 * @param {string} props.email
 * @param {string} props.mobile
 * @param {string} prop.website
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertSourcesListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { name, url, email, mobile, website } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="AlertSourcesListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar>{name.toUpperCase().charAt(0)}</Avatar>
            )}
          </Col>
          <Col span={5}>{name}</Col>
          <Col span={3}>{email}</Col>
          <Col span={3}>{mobile}</Col>
          <Col span={4}>{website}</Col>
          <Col span={5}>{url}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Alert Source"
                  className="actionIcon"
                />
                <Icon
                  type="share-alt"
                  title="Share Alert Source"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive Source"
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

export default AlertSourcesListItem;
