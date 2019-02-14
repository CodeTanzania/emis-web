import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

/**
 * @class
 * @name ActivitiesListItem
 * @description Single activity list item component. Render single activity details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ActivitiesListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    code: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    incidentType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    match: PropTypes.shape({ url: PropTypes.string.isRequired }).isRequired,
    name: PropTypes.string.isRequired,
    phase: PropTypes.string.isRequired,
    onArchive: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle mouse enter into a list item event
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
   * @description Handle mouse leave from list item event
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
   * @description Handle toggle list item checkbox
   *
   * @param {Object} event checkbox toggle event
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
      id,
      code,
      color,
      name,
      incidentType,
      description,
      phase,
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
        className="ActivitiesListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent}</Col>
          <Col span={7} title={description}>
            {name}
          </Col>
          <Col span={6}>{incidentType}</Col>
          <Col span={6}>{phase}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Link to={`${match.url}/${id}`}>
                  <Icon
                    type="bars"
                    title="View Plan Activities"
                    className="actionIcon"
                  />
                </Link>

                <Icon
                  type="edit"
                  title="Update Activity"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="share-alt"
                  title="Share Activity"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive Activity"
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

export default withRouter(ActivitiesListItem);
