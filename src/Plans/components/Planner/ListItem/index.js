import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

/**
 * @class
 * @name PlansListItem
 * @description Single plan list item component. Render single plan details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class PlansListItem extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isHovered: false,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle mouse enter list item event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  /**
   * @function
   * @name handleMouseLeave
   * @description Handle mouse leave list item event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  /**
   * @function
   * @name handleToggleSelect
   * @description Handle toggle select checkbox for list item
   *
   * @param {object} event Toggle checkbox event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleToggleSelect = event => {
    const { isSelected } = this.state;
    const { onSelectItem, onDeselectItem } = this.props;

    this.setState({ isSelected: !isSelected });
    if (event.target.checked) {
      onSelectItem();
    } else {
      onDeselectItem();
    }
  };

  render() {
    const {
      boundary,
      code,
      color,
      incidentType,
      id,
      owner,
      onEdit,
      onArchive,
      match,
    } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    const avatarBackground = color || randomColor();
    let sideComponent = null;

    if (isSelected) {
      sideComponent = (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      );
    } else {
      sideComponent = isHovered ? (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      ) : (
        <Avatar style={{ backgroundColor: avatarBackground }}>{code}</Avatar>
      );
    }

    return (
      <div
        className="PlansListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent}</Col>
          <Col span={5}>{incidentType}</Col>
          <Col span={9}>{owner}</Col>
          <Col span={4}>{boundary}</Col>
          <Col span={5}>
            {isHovered && (
              <>
                <Link to={`${match.url}/${id}`}>
                  <Icon
                    type="bars"
                    title="View Plan Activities"
                    className="actionIcon"
                  />
                </Link>

                <Icon
                  type="sound"
                  title="Disseminate Plan"
                  className="actionIcon"
                />
                <Icon
                  type="poweroff"
                  title="Activate Plan"
                  className="actionIcon"
                />
                <Icon
                  type="edit"
                  title="Update Plan"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="database"
                  title="Archive Plan"
                  className="actionIcon"
                  onClick={onArchive}
                />
              </>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

PlansListItem.propTypes = {
  boundary: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  color: PropTypes.string,
  incidentType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onDeselectItem: PropTypes.func.isRequired,
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
};

PlansListItem.defaultProps = {
  color: undefined,
};

export default withRouter(PlansListItem);
