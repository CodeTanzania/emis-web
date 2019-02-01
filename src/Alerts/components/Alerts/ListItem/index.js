import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single alert list item component. Render single alert details
 *
 * @class
 * @name AlertsListItem
 *
 * @param {Object} props
 * @param {string} props.abbreviation
 * @param {string} props.source
 * @param {string} props.event
 * @param {string} props.headline
 * @param {string} props.description
 * @param {string} props.color
 * @param {string} props.expectedAt
 * @param {string} props.expiredAt
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
    severity: PropTypes.func.isRequired,
    urgency: PropTypes.func.isRequired,
  };

  static defaultProps = {
    description: '',
    headline: '',
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  /**
   * Transforms ISO date to human readable date
   *
   * @function
   * @name toHumanReadableDate
   *
   * @param {String} isoFormatDate
   * @returns humanReadableDate
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  toHumanReadableDate = isoFormatDate =>
    moment(isoFormatDate)
      .utc()
      .format('ddd, MMM DD YYYY hA');

  formatTime = date => moment(date).format('ddd, MMM DD YYYY hA');

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
    const eventTitle = description || headline;
    const avatarBackgroundColor = color || randomColor();
    return (
      <div
        className="AlertsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: avatarBackgroundColor }}>
                {abbreviation}
              </Avatar>
            )}
          </Col>
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
