import { deleteActivity } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import ActivitiesActionBar from '../ActionBar';
import ActivitiesListHeader from '../ListHeader';
import ActivitiesListItem from '../ListItem';

/**
 * Render ActivitiesList component which have actionBar, activities header and
 * activities list components
 *
 * @class
 * @name ActivitiesList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ActivitiesList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    activities: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
  };

  state = {
    selectedActivities: [],
  };

  /**
   * Handle select a single activity action
   *
   * @function
   * @name handleOnSelectActivity
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectActivity = activity => {
    const { selectedActivities } = this.state;
    this.setState({
      selectedActivities: concat([], selectedActivities, activity),
    });
  };

  /**
   * Handle selected all activities actions
   *
   * @function
   * @name handleSelectAll
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {};

  /**
   * Handle filter activities by status action
   *
   * @function
   * @name handleFilterByStatus
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleFilterByStatus = () => {
    // if (status === 'All') {
    //   filterActivities({});
    // } else if (status === 'Active') {
    //   filterActivities({});
    // } else if (status === 'Archived') {
    //   filterActivities({});
    // }
  };

  /**
   * Handle deselect a single activity action
   *
   * @function
   * @name handleOnDeselectActivity
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectActivity = activity => {
    const { selectedActivities } = this.state;
    const selectedList = [...selectedActivities];

    remove(
      selectedList,
      item => item._id === activity._id // eslint-disable-line
    );

    this.setState({ selectedActivities: selectedList });
  };

  render() {
    const {
      activities,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onNotify,
    } = this.props;
    const { selectedActivities } = this.state;
    const selectedActivitiesCount = this.state.selectedActivities.length;

    return (
      <Fragment>
        {/* list action bar */}
        <ActivitiesActionBar
          total={total}
          page={page}
          onFilter={onFilter}
          onNotify={() => {
            onNotify(selectedActivities);
          }}
          selectedItemCount={selectedActivitiesCount}
          onFilterByStatus={this.handleFilterByStatus}
        />
        {/* end action bar */}

        {/* activity list header */}
        <ActivitiesListHeader />
        {/* end activity list header */}

        {/* activities list */}
        <List
          loading={loading}
          dataSource={activities}
          renderItem={activity => (
            <ActivitiesListItem
              id={activity._id} // eslint-disable-line
              key={activity._id} // eslint-disable-line
              code={activity.incidentType.code}
              color={activity.incidentType.color}
              name={activity.name}
              incidentType={activity.incidentType.name}
              phase={activity.phase}
              description={activity.description}
              isSelected={
                // eslint-disable-next-line
                map(selectedActivities, item => item._id).includes(activity._id)
              }
              onSelectItem={() => {
                this.handleOnSelectActivity(activity); // eslint-disable-line
              }}
              onDeselectItem={() => {
                this.handleOnDeselectActivity(activity); // eslint-disable-line
              }}
              onEdit={() => onEdit(activity)}
              onArchive={() =>
                deleteActivity(
                  activity._id, // eslint-disable-line
                  () => {
                    notifySuccess('Activity was archived successfully');
                  },
                  () => {
                    notifyError(
                      'An Error occurred while archiving Activity please activity system administrator'
                    );
                  }
                )
              }
            />
          )}
        />
        {/* end activities list */}
      </Fragment>
    );
  }
}

export default ActivitiesList;
