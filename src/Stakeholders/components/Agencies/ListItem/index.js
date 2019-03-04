import { Avatar, Checkbox, Col, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import React, { Component } from 'react';
import ListItemActions from '../../../../components/ListItemActions';
import './styles.css';

/* constants */
const { confirm } = Modal;

/**
 * @class
 * @name AgencyListItem
 * @description Single agency list item component. Render single agency details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AgencyListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    abbreviation: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    onArchive: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
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
   * @param {Object} event - Event object
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
   * @description show confirm modal before archiving a agency
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  showArchiveConfirm = () => {
    const { name, onArchive } = this.props;
    confirm({
      title: `Are you sure you want to archive ${name} ?`,
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
      name,
      email,
      mobile,
      area,
      onEdit,
      onShare,
    } = this.props;
    const { isHovered } = this.state;
    const { isSelected } = this.props;
    const avatarBackground = randomColor();
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
          {name.toUpperCase().charAt(0)}
        </Avatar>
      );
    }

    return (
      <div
        className="AgencyListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent}</Col>
          <Col span={5}>{name}</Col>
          <Col span={3}>{abbreviation}</Col>
          <Col span={3}>{area}</Col>
          <Col span={4}>{mobile}</Col>
          <Col span={5}>{email}</Col>
          <Col span={2}>
            {isHovered && (
              <ListItemActions
                edit={{
                  name: 'Edit Agency',
                  title: 'Update Agency details',
                  onClick: onEdit,
                }}
                share={{
                  name: 'Share Agency',
                  title: 'Share Agency',
                  onClick: onShare,
                }}
                archive={{
                  name: 'Archive Agency',
                  title: 'Remove Agency from the list of Active Agencies',
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

export default AgencyListItem;
