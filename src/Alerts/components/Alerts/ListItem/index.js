import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * @class
 * @name AlertsListItem
 * @description Single alert list item component. Render single alert details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertsListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    abbreviation: PropTypes.string.isRequired,
    headline: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.string.isRequired,
    event: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    certainty: PropTypes.string.isRequired,
    expiredAt: PropTypes.string.isRequired,
    expectedAt: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
    severity: PropTypes.func.isRequired,
    urgency: PropTypes.func.isRequired,
  };

  static defaultProps = {
    description: '',
    headline: '',
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on MouseEnter ListItem event
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on MouseLeave ListItem event
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
   * @description Handle Toggling List Item checkbox
   *
   * @param {object} event - Event object
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

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @function
   * @name toHumanReadableDate
   * @description Transforms ISO date to human readable date
   *
   * @param {string} isoFormatDate iso format date string
   * @returns {string} humanReadableDate
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  toHumanReadableDate = isoFormatDate =>
    moment(isoFormatDate)
      .utc()
      .format('ddd, MMM DD YYYY hA');

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @function
   * @name formatTime
   * @description formats date to ddd, MMM DD YYYY hA format
   *
   * @param {object} date date object
   * @returns {string} formatted date
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  formatTime = date => moment(date).format('ddd, MMM DD YYYY hA');

  // eslint-disable-next-line jsdoc/require-returns-check
  /**
   * @function
   * @name timeAgo
   * @description creates relative date
   *
   * @param {object} date date object
   * @returns {string} relative time
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  timeAgo = date => moment(date).fromNow();

  render() {
    const {
      abbreviation,
      source,
      color,
      certainty,
      onEdit,
      event,
      headline,
      description,
      expiredAt,
      expectedAt,
      urgency,
      severity,
    } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    const eventTitle = description || headline;
    const avatarBackgroundColor = color || randomColor();
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
        <Avatar style={{ backgroundColor: avatarBackgroundColor }}>
          {abbreviation}
        </Avatar>
      );
    }
    return (
      <div
        className="AlertsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent}</Col>
          <Col span={7} title={eventTitle}>
            {event}
          </Col>
          <Col span={2}>{severity}</Col>
          <Col span={2}>{certainty}</Col>
          <Col span={2}>{urgency}</Col>
          <Col title={this.formatTime(expectedAt)} span={2}>
            {this.timeAgo(expectedAt)}
          </Col>
          <Col title={this.formatTime(expectedAt)} span={2}>
            {this.timeAgo(expiredAt)}
          </Col>
          <Col span={3}>{source}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Alert"
                  className="actionIcon"
                  onClick={onEdit}
                />

                <Icon
                  type="mail"
                  title="Send Alert"
                  className="actionIcon"
                  onClick={() => {}}
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AlertsListItem;
