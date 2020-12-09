import { Avatar, Checkbox, Col, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import randomColor from 'randomcolor';
import ListItemActions from '../../../../components/ListItemActions';
// eslint-disable-next-line import/named
import { formatTime, timeAgo } from '../../../../util';
import './styles.css';

const { confirm } = Modal;

/**
 * @class
 * @name CampaignListItem
 * @description Single role list item component. Render single role details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class CampaignListItem extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isHovered: false,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description Handle on mouse enter role list item
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
   * @description Handle on mouse leave role list item
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
   * @description show confirm modal before archiving a role
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  showArchiveConfirm = () => {
    const { title, onArchive } = this.props;
    confirm({
      title: `Are you sure you want to archive ${title} ?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onArchive();
      },
    });
  };

  render() {
    const { form, title, sentAt, sent } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    let sideComponent = null;
    const avatarBackground = randomColor();

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
          {title.charAt(0).toUpperCase()}
        </Avatar>
      );
    }

    return (
      <div
        className="NotificationListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent}</Col>
          <Col span={6} title="Notification title">
            {title}
          </Col>
          <Col span={4} title="Notification form ">
            {form}
          </Col>
          <Col span={4} title="Sent Notifications">
            {sent}
          </Col>
          <Col span={5} title={formatTime(sentAt)}>
            {timeAgo(sentAt)}
          </Col>
          <Col span={2}>
            {isHovered && (
              <ListItemActions
                archive={{
                  name: 'Archive Notifications',
                  title: 'Remove Notifications from the list',
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

CampaignListItem.propTypes = {
  title: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
  sent: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  onDeselectItem: PropTypes.func.isRequired,
};

export default CampaignListItem;
