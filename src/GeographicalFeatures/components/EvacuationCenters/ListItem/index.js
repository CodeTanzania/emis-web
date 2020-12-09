import { Icon, Avatar, Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';

/**
 *
 * @class
 * @name EvacuationCenterListItem
 * @description Single Evacuation Center list item component.
 * Render single Evacuation Center details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class EvacuationCenterListItem extends Component {
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
        className="EvacuationCenterListItem"
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
                  title="Update Evacuation Center"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive Evacuation Center"
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

EvacuationCenterListItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EvacuationCenterListItem;
