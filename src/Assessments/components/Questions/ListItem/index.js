import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single question list item component. Render single question details
 *
 * @class
 * @name QuestionsListItem
 *
 * @param {Object} props
 * @param {string} props.color
 * @param {string} props.label
 * @param {string} props.phase
 * @param {string} props.assess
 * @param {string} props.stage
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class QuestionsListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    phase: PropTypes.string.isRequired,
    assess: PropTypes.string.isRequired,
    stage: PropTypes.string.isRequired,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const { color, label, phase, assess, stage } = this.props;
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
                {label.charAt(0)}
              </Avatar>
            )}
          </Col>
          <Col span={8}>{label}</Col>
          <Col span={3}>{phase}</Col>
          <Col span={4}>{assess}</Col>
          <Col span={3}>{stage}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Question"
                  className="actionIcon"
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
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default QuestionsListItem;
