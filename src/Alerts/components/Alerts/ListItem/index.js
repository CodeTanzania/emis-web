import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import moment from 'moment';
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
    expiredAt: PropTypes.string.isRequired,
    expectedAt: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
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
   * Tranforms ISO date to human readable date
   *
   * @function
   * @name toHumanReadableDate
   *
   * @param {String} isoFormattDate
   * @returns humanReadableDate
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  toHumanReadableDate = isoFormattDate =>
    moment(isoFormattDate)
      .utc()
      .format('dddd, MMMM Do YYYY');

  render() {
    const {
      abbreviation,
      source,
      color,
      onEdit,
      onArchive,
      event,
      headline,
      description,
      expiredAt,
      expectedAt,
    } = this.props;
    const { isHovered } = this.state;
    const eventTitle = description || headline;
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
              <Avatar style={{ backgroundColor: color }}>{abbreviation}</Avatar>
            )}
          </Col>
          <Col span={9} title={eventTitle}>
            {event}
          </Col>
          <Col span={3}>{this.toHumanReadableDate(expectedAt)}</Col>
          <Col span={3}>{this.toHumanReadableDate(expiredAt)}</Col>
          <Col span={5}>{source}</Col>
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
                  type="share-alt"
                  title="Share Alert"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive Alert"
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

export default AlertsListItem;
