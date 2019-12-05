import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';

/**
 * @class
 * @name IncidentTypesListItem
 * @description Single incidenttype list item component. Render single
 * incident type details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IncidentTypesListItem extends Component {
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
              <>
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
              </>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

IncidentTypesListItem.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nature: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  cap: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default IncidentTypesListItem;
