import { Avatar, Checkbox, Col, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * Single questionaire list item component. Render single questionnaire details
 *
 * @class
 * @name QuestionnairesListItem
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.phase
 * @param {string} props.assess
 * @param {string} props.stage
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class QuestionnairesListItem extends Component {
  state = {
    isHovered: false,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
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
    const { title, phase, assess, stage } = this.props;
    const { isHovered } = this.state;
    return (
      <div
        className="QuestionnairesListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>
            {isHovered ? (
              <Checkbox className="Checkbox" />
            ) : (
              <Avatar>{phase.charAt(0)}</Avatar>
            )}
          </Col>
          <Col span={8}>{title}</Col>
          <Col span={3}>{phase}</Col>
          <Col span={4}>{assess}</Col>
          <Col span={3}>{stage}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="edit"
                  title="Update Questionnaire"
                  className="actionIcon"
                />
                <Icon
                  type="share-alt"
                  title="Share Questionnaire"
                  className="actionIcon"
                />
                <Icon
                  type="database"
                  title="Archive Questionnaire"
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

export default QuestionnairesListItem;
