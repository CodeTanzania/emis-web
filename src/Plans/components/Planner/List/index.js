import { deletePlan } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import PlansActionBar from '../ActionBar';
import PlansListHeader from '../ListHeader';
import PlansListItem from '../ListItem';

/**
 * Render PlansList component which have actionBar, plans header and
 * plans list components
 *
 * @class
 * @name PlansList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class PlansList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    plans: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
  };

  state = {
    selectedPlans: [],
  };

  /**
   * Handle select a single plan action
   *
   * @function
   * @name handleOnSelectPlan
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectPlan = plan => {
    const { selectedPlans } = this.state;
    this.setState({ selectedPlans: concat([], selectedPlans, plan) });
  };

  /**
   * Handle selected all plans actions
   *
   * @function
   * @name handleSelectAll
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {};

  /**
   * Handle filter plans by status action
   *
   * @function
   * @name handleFilterByStatus
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleFilterByStatus = () => {
    // if (status === 'All') {
    //   filterPlans({});
    // } else if (status === 'Active') {
    //   filterPlans({});
    // } else if (status === 'Archived') {
    //   filterPlans({});
    // }
  };

  /**
   * Handle deselect a single plan action
   *
   * @function
   * @name handleOnDeselectPlan
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectPlan = plan => {
    const { selectedPlans } = this.state;
    const selectedList = [...selectedPlans];

    remove(
      selectedList,
      item => item._id === plan._id // eslint-disable-line
    );

    this.setState({ selectedPlans: selectedList });
  };

  render() {
    const {
      plans,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onNotify,
    } = this.props;
    const { selectedPlans } = this.state;
    const selectedPlansCount = this.state.selectedPlans.length;

    return (
      <Fragment>
        {/* list action bar */}
        <PlansActionBar
          total={total}
          page={page}
          onFilter={onFilter}
          onNotify={() => {
            onNotify(selectedPlans);
          }}
          selectedItemCount={selectedPlansCount}
          onFilterByStatus={this.handleFilterByStatus}
        />
        {/* end action bar */}

        {/* plan list header */}
        <PlansListHeader />
        {/* end plan list header */}

        {/* plans list */}
        <List
          loading={loading}
          dataSource={plans}
          renderItem={plan => (
            <PlansListItem
              key={plan._id} // eslint-disable-line
              code={plan.incidentType.code}
              color={plan.incidentType.color}
              incidentType={plan.incidentType.name}
              owner={plan.owner.name}
              boundary={plan.boundary.name}
              isSelected={
                // eslint-disable-next-line
                map(selectedPlans, item => item._id).includes(plan._id)
              }
              onSelectItem={() => {
                this.handleOnSelectPlan(plan);
              }}
              onDeselectItem={() => {
                this.handleOnDeselectPlan(plan);
              }}
              onEdit={() => onEdit(plan)}
              onArchive={() =>
                deletePlan(
                  plan._id, // eslint-disable-line
                  () => {
                    notifySuccess('Plan was archived successfully');
                  },
                  () => {
                    notifyError(
                      'An Error occurred while archiving Plan please plan system administrator'
                    );
                  }
                )
              }
            />
          )}
        />
        {/* end plans list */}
      </Fragment>
    );
  }
}

export default PlansList;
