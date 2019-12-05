import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';

/**
 *
 * @class
 * @name QuestionsListItem
 * @description Single question list item component.Render single question
 * details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class QuestionsListItem extends Component {
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
    const { label, phase, assess, stage, onEdit, color } = this.props;
    const { isHovered } = this.state;

    return (
      <div
        className="QuestionsListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar style={{ backgroundColor: color }}>
                {phase.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </Col>
          <Col span={8}>{label}</Col>
          <Col span={3}>{phase}</Col>
          <Col span={4}>{assess}</Col>
          <Col span={3}>{stage}</Col>
          <Col span={3}>
            {isHovered && (
              <>
                <Icon
                  type="edit"
                  title="Update Question"
                  className="actionIcon"
                  onClick={onEdit}
                />
                <Icon
                  type="share-alt"
                  title="Share Question"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive Question"
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

QuestionsListItem.propTypes = {
  label: PropTypes.string.isRequired,
  phase: PropTypes.string.isRequired,
  assess: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default QuestionsListItem;
