import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single incidenttype list item component. Render single incidenttype details
 *
 * @class
 * @name IncidentTypesListItem
 *
 * @param {Object} props
 * @param {string} props.abbreviation
 * @param {string} props.name
 * @param {string} props.title
 * @param {string} props.email
 * @param {string} props.mobile
 * @version 0.1.0
 * @since 0.1.0
 */
class IncidentTypesListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    abbreviation: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { abbreviation, name, title, email, mobile } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="ContactsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar>{abbreviation}</Avatar>
            )}
          </Col>
          <Col span={4}>{name}</Col>
          <Col span={5}>{title}</Col>
          <Col span={4}>{email}</Col>
          <Col span={4}>{mobile}</Col>
          <Col span={4}>{name}</Col>
          <Col span={2}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update incidenttypes"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive incidenttypes"
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

export default IncidentTypesListItem;
