import { deleteStakeholder } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ListHeader from '../../../../components/ListHeader';
import { notifyError, notifySuccess } from '../../../../util';
import AgencyActionBar from '../ActionBar';
import AgencyListItem from '../ListItem';

/* constants */
const headerLayout = [
  { span: 5, header: 'Name', offset: 0 },
  { span: 6, header: 'Role' },
  { span: 4, header: 'Mobile Number' },
  { span: 4, header: 'Email Address' },
];

/**
 * @class
 * @name AgencyList
 * @description Render AgencyList component which have actionBar, agencies header and
 * agency list item components
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AgencyList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    agencies: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
  };

  state = {
    selectedAgency: [],
  };

  /**
   * @function
   * @name handleOnSelectAgency
   * @description Handle select a single agency action
   *
   * @param {Object} agency selected agency object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectAgency = agency => {
    const { selectedAgency } = this.state;
    this.setState({ selectedAgency: concat([], selectedAgency, agency) });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle selected all agencies actions
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {};

  /**
   * @function
   * @name handleFilterByStatus
   * @description Handle filter agencies by status action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleFilterByStatus = () => {
    // if (status === 'All') {
    //   filterStakeholders({});
    // } else if (status === 'Active') {
    //   filterStakeholders({});
    // } else if (status === 'Archived') {
    //   filterStakeholders({});
    // }
  };

  /**
   * @function
   * @name handleOnDeselectAgency
   * @description Handle deselect a single agency action
   *
   * @param {Object} agency agency to be removed from selected agencies
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectAgency = agency => {
    const { selectedAgency } = this.state;
    const selectedList = [...selectedAgency];

    remove(
      selectedList,
      item => item._id === agency._id // eslint-disable-line
    );

    this.setState({ selectedAgency: selectedList });
  };

  render() {
    const {
      agencies,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onNotify,
    } = this.props;
    const { selectedAgency } = this.state;
    const selectedAgencyCount = this.state.selectedAgency.length;

    return (
      <Fragment>
        {/* list action bar */}
        <AgencyActionBar
          total={total}
          page={page}
          onFilter={onFilter}
          onNotify={() => {
            onNotify(selectedAgency);
          }}
          selectedItemCount={selectedAgencyCount}
          onFilterByStatus={this.handleFilterByStatus}
        />
        {/* end action bar */}

        {/* agency list header */}
        <ListHeader headerLayout={headerLayout} />
        {/* end agency list header */}

        {/* agencies list */}
        <List
          loading={loading}
          dataSource={agencies}
          renderItem={agency => (
            <AgencyListItem
              key={agency._id} // eslint-disable-line
              abbreviation={agency.abbreviation}
              name={agency.name}
              title={agency.role ? agency.role.name : 'N/A'}
              email={agency.email}
              mobile={agency.mobile}
              isSelected={
                // eslint-disable-next-line
                map(selectedAgency, item => item._id).includes(agency._id)
              }
              onSelectItem={() => {
                this.handleOnSelectAgency(agency);
              }}
              onDeselectItem={() => {
                this.handleOnDeselectAgency(agency);
              }}
              onEdit={() => onEdit(agency)}
              onArchive={() =>
                deleteStakeholder(
                  agency._id, // eslint-disable-line
                  () => {
                    notifySuccess('Agency was archived successfully');
                  },
                  () => {
                    notifyError(
                      'An Error occurred while archiving Agency please contact system administrator'
                    );
                  }
                )
              }
            />
          )}
        />
        {/* end agencies list */}
      </Fragment>
    );
  }
}

export default AgencyList;
