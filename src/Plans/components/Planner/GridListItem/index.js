import { Badge, Button, Card, Col, Popover, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

/**
 * Plan Options
 *
 * @param {Object} props
 * @param {function} props.onEditPlan
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const PlanOptions = ({ onEditPlan }) => (
  <Fragment>
    <div>
      <Button icon="poweroff" className="b-0">
        Activate
      </Button>
    </div>
    <div>
      <Button icon="sound" className="b-0">
        Disseminate
      </Button>
    </div>
    <div>
      <Button icon="edit" className="b-0" onClick={onEditPlan}>
        Edit Plan
      </Button>
    </div>
    <div>
      <Button icon="hdd" className="b-0">
        Archive Plan
      </Button>
    </div>
  </Fragment>
);

/**
 * Plan card component
 *
 * A card component renders in plan list
 *
 * @class
 * @name PlansGridListItem
 *
 * @param {Object} props
 * @param {string} props.incidentType
 * @param {string} props.jurisdiction
 * @param {string} props.description
 * @param {string} props.nature
 * @param {string} props.family
 * @param {number} props.activityCount
 * @param {string} props.color
 * @param {Date} updatedAt
 * @param {function} onClickPlan
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class PlansGridListItem extends Component {
  state = { showPopover: false };

  static propTypes = {
    incidentType: PropTypes.string.isRequired,
    jurisdiction: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    description: PropTypes.string,
    nature: PropTypes.string,
    family: PropTypes.string,
    activityCount: PropTypes.number,
    color: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    onClickPlan: PropTypes.func.isRequired,
    onEditPlan: PropTypes.func.isRequired,
    owner: PropTypes.string,
  };

  static defaultProps = {
    activityCount: 0,
    color: '#0071fc',
    nature: 'N/A',
    family: 'N/A',
    owner: 'N/A',
    description: '',
  };

  /**
   * Handle popover visibility change
   *
   * @function
   * @name handlePopoverVisibilityChange
   *
   * @param {boolean} isVisible
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handlePopoverVisibilityChange = isVisible => {
    this.setState({ showPopover: isVisible });
  };

  /**
   * Handle hide popover component
   *
   * @function
   * @name handleHidePopover
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleHidePopover = () => {
    this.setState({ showPopover: false });
  };

  /**
   * Handle edit plan action
   *
   * @function
   * @name handleEditPlan
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEditPlan = () => {
    const { onEditPlan } = this.props;
    onEditPlan();
    this.handleHidePopover();
  };

  /**
   * Handle disseminate plan action
   *
   * @function
   * @name handleDisseminatePlan
   *
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDisseminatePlan = () => {
    this.handleHidePopover();
  };

  /**
   * Handle activate plan action
   *
   * @function
   * @name handleActivatePlan
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleActivatePlan = () => {
    this.handleHidePopover();
  };

  render() {
    const { showPopover } = this.state;

    const {
      incidentType,
      jurisdiction,
      level,
      description,
      nature,
      family,
      owner,
      activityCount,
      color,
      updatedAt,
      onClickPlan,
    } = this.props;

    return (
      <Card
        className="PlansGridListItem"
        style={{
          borderLeft: `3px solid ${color}`,
          padding: 0,
        }}
      >
        <Link
          to="/plans/plan/activities"
          title={description}
          onClick={onClickPlan}
        >
          <Row justify="space-between">
            <Col span={21} xl={18} xxl={20}>
              <h3 title={incidentType}>{incidentType}</h3>
              <p
                className="subtitle"
                style={{ fontSize: '11px', color: '#0092df' }}
              >
                {`${nature} > ${family}`}
              </p>
              <p className="subtitle">{`Area: ${jurisdiction} (${level})`}</p>
              <p className="subtitle">{`Created by: ${owner}`}</p>
            </Col>
            <Col span={3} xl={6} xxl={4} className="activitiesBadge">
              <Badge
                count={activityCount}
                style={{
                  backgroundColor: '#fff',
                  color: '#999',
                  boxShadow: '0 0 0 1px #d9d9d9 inset',
                }}
              />
              <p className="activitiesBadgeTitle">Activities</p>
            </Col>
          </Row>
          <p className="subtitle">
            Last Review Date:{' '}
            {new Intl.DateTimeFormat('en-GB').format(new Date(updatedAt))}
          </p>
        </Link>
        <Popover
          content={<PlanOptions onEditPlan={this.handleEditPlan} />}
          trigger="hover"
          placement="bottomRight"
          visible={showPopover}
          onVisibleChange={this.handlePopoverVisibilityChange}
        >
          <Button icon="ellipsis" className="ActionButton" />
        </Popover>
      </Card>
    );
  }
}

PlanOptions.propTypes = {
  onEditPlan: PropTypes.func.isRequired,
};

export default PlansGridListItem;
