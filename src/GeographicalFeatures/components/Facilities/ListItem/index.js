import { Icon, Avatar, Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';

/**
 *
 * @class
 * @name FacilityListItem
 * @description  Single Facility list item component.
 * Render single Facility details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class FacilityListItem extends Component {
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
    const { name, type, onEdit } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="FacilityListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar>{name.slice(0, 1)}</Avatar>
            )}
          </Col>
          <Col span={9}>{name}</Col>
          <Col span={10}>{type}</Col>
          <Col span={3}>
            {isHovered && (
              <>
                <Icon
                  type="edit"
                  title="Update Facility"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive Facility"
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

FacilityListItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default FacilityListItem;
