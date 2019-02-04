import { deleteProcedure } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import ProceduresActionBar from '../ActionBar';
import ProceduresListHeader from '../ListHeader';
import ProceduresListItem from '../ListItem';

/**
 * Render ProceduresList component which have actionBar, procedures header and
 * procedures list components
 *
 * @class
 * @name ProceduresList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ProceduresList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    procedures: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
  };

  state = {
    selectedProcedures: [],
  };

  /**
   * Handle select a single procedure action
   *
   * @function
   * @name handleOnSelectProcedure
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectProcedure = procedure => {
    const { selectedProcedures } = this.state;
    this.setState({
      selectedProcedures: concat([], selectedProcedures, procedure),
    });
  };

  /**
   * Handle selected all procedures actions
   *
   * @function
   * @name handleSelectAll
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {};

  /**
   * Handle filter procedures by status action
   *
   * @function
   * @name handleFilterByStatus
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleFilterByStatus = () => {
    // if (status === 'All') {
    //   filterProcedures({});
    // } else if (status === 'Active') {
    //   filterProcedures({});
    // } else if (status === 'Archived') {
    //   filterProcedures({});
    // }
  };

  /**
   * Handle deselect a single procedure action
   *
   * @function
   * @name handleOnDeselectProcedure
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectProcedure = procedure => {
    const { selectedProcedures } = this.state;
    const selectedList = [...selectedProcedures];

    remove(
      selectedList,
      item => item._id === procedure._id // eslint-disable-line
    );

    this.setState({ selectedProcedures: selectedList });
  };

  render() {
    const {
      procedures,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onNotify,
    } = this.props;
    const { selectedProcedures } = this.state;
    const selectedProceduresCount = this.state.selectedProcedures.length;

    return (
      <Fragment>
        {/* list action bar */}
        <ProceduresActionBar
          total={total}
          page={page}
          onFilter={onFilter}
          onNotify={() => {
            onNotify(selectedProcedures);
          }}
          selectedItemCount={selectedProceduresCount}
          onFilterByStatus={this.handleFilterByStatus}
        />
        {/* end action bar */}

        {/* procedure list header */}
        <ProceduresListHeader />
        {/* end procedure list header */}

        {/* procedures list */}
        <List
          loading={loading}
          dataSource={procedures}
          renderItem={procedure => (
            <ProceduresListItem
              key={procedure._id} // eslint-disable-line
              name={procedure.name}
              code={procedure.incidentType.code}
              color={procedure.incidentType.color}
              phase={procedure.phase}
              incidentType={procedure.incidentType.name}
              activity={procedure.activity.name}
              owner={procedure.plan.owner.name}
              description={procedure.description}
              isSelected={
                // eslint-disable-next-line
                map(selectedProcedures, item => item._id).includes(
                  procedure._id // eslint-disable-line
                )
              }
              onSelectItem={() => {
                this.handleOnSelectProcedure(procedure); // eslint-disable-line
              }}
              onDeselectItem={() => {
                this.handleOnDeselectProcedure(procedure); // eslint-disable-line
              }}
              onEdit={() => onEdit(procedure)}
              onArchive={() =>
                deleteProcedure(
                  procedure._id, // eslint-disable-line
                  () => {
                    notifySuccess('Procedure was archived successfully');
                  },
                  () => {
                    notifyError(
                      'An Error occurred while archiving Procedure please procedure system administrator'
                    );
                  }
                )
              }
            />
          )}
        />
        {/* end procedures list */}
      </Fragment>
    );
  }
}

export default ProceduresList;
