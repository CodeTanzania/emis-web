import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * @class
 * @name AlertSourcesListItem
 * @description Single Alert Source list item component. Render
 * single Source details
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
    onEdit: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
  };

  /**
   * @class
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
   * @class
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
    const { name, url, email, mobile, website, onEdit, onArchive } = this.props;
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
                  onClick={onEdit}
                />

                <Icon
                  type="sync"
                  title="Reload Alerts"
                  className="actionIcon"
                  onClick={() => {}}
                />

                <Icon
                  type="database"
                  title="Archive Source"
                  className="actionIcon"
                  onClick={onArchive}
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
