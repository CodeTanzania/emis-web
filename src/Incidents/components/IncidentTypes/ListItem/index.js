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
 * @param {string} props.color
 * @param {string} props.name
 * @param {string} props.nature
 * @param {string} props.cap
 * @param {string} props.family
 * @param {string} props.cope
 * @param {string} props.onEdit

 * @version 0.1.0
 * @since 0.1.0
 */
class IncidentTypesListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nature: PropTypes.string.isRequired,
    family: PropTypes.string.isRequired,
    cap: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { color, name, nature, family, cap, code, onEdit } = this.props;

    const { isHovered } = this.state;
    return (
      <div
        className="IncidentTypesListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: color }}>
                {name.charAt(0)}
              </Avatar>
            )}
          </Col>
          <Col span={5}>{name}</Col>
          <Col span={4}>{nature}</Col>
          <Col span={4}>{family}</Col>
          <Col span={4}>{code}</Col>
          <Col span={3}>{cap}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Incident Types"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive Incident Types"
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
