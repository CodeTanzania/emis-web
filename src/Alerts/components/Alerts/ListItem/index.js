import { Avatar, Checkbox, Col, Row, Modal } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component } from 'react';
import ListItemActions from '../../../../components/ListItemActions';
import './styles.css';

/* constants */
const { confirm } = Modal;

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
const formatTime = date => moment(date).format('ddd, MMM DD YYYY hA');

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
const timeAgo = date => moment(date).fromNow();

/**
 * @class
 * @name AlertListItem
 * @description Single alert list item component. Render single alert details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    abbreviation: PropTypes.string.isRequired,
    headline: PropTypes.string,
    description: PropTypes.string,
    event: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    certainty: PropTypes.string.isRequired,
    expiredAt: PropTypes.string.isRequired,
    expectedAt: PropTypes.string.isRequired,
    severity: PropTypes.func.isRequired,
    urgency: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
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

  /**
   * @function
   * @name showArchiveConfirm
   * @description show confirm modal before archiving a alert
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  showArchiveConfirm = () => {
    const { event, onArchive } = this.props;
    confirm({
      title: `Are you sure you want to archive ${event} ?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onArchive();
      },
    });
  };

  render() {
    const {
      abbreviation,
      color,
      source,
      certainty,
      event,
      headline,
      description,
      expiredAt,
      expectedAt,
      urgency,
      severity,
      onEdit,
    } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    const eventTitle = description || headline;
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
        <Avatar style={{ backgroundColor: avatarBackground }}>
          {abbreviation}
        </Avatar>
      );
    }

    return (
      <div
        className="AlertListItem"
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
          <Col span={2} title={formatTime(expectedAt)}>
            {timeAgo(expectedAt)}
          </Col>
          <Col span={2} title={formatTime(expectedAt)}>
            {timeAgo(expiredAt)}
          </Col>
          <Col span={3}>{source}</Col>
          <Col span={3}>
            {isHovered && (
              <ListItemActions
                edit={{
                  name: 'Edit Alert',
                  title: 'Update Alert details',
                  onClick: onEdit,
                }}
                archive={{
                  name: 'Archive Alert',
                  title: 'Remove Alert from the list of Active Alerts',
                  onClick: this.showArchiveConfirm,
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AlertListItem;
