import {
  deleteAgency,
  paginateAgencies,
  refreshAgencies,
} from '@codetanzania/emis-api-states';
import { httpActions } from '@codetanzania/emis-api-client';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';
import intersectionBy from 'lodash/intersectionBy';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ListHeader from '../../../../components/ListHeader';
import { notifyError, notifySuccess } from '../../../../util';
import Toolbar from '../../../../components/Toolbar';
import AgencyListItem from '../ListItem';

/* constants */
const nameSpan = { xxl: 5, xl: 5, lg: 5, md: 7, sm: 14, xs: 14 };
const abbreviationSpan = { xxl: 3, xl: 3, lg: 3, md: 3, sm: 0, xs: 0 };
const areaSpan = { xxl: 4, xl: 4, lg: 4, md: 0, sm: 0, xs: 0 };
const phoneSpan = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 6, xs: 6 };
const emailSpan = { xxl: 5, xl: 5, lg: 5, md: 6, sm: 0, xs: 0 };

const headerLayout = [
  { ...nameSpan, header: 'Name' },
  { ...abbreviationSpan, header: 'Abbreviation' },
  { ...areaSpan, header: 'Area' },
  { ...phoneSpan, header: 'Phone Number' },
  { ...emailSpan, header: 'Email' },
];
const { getAgenciesExportUrl } = httpActions;

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
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedAgencies: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnSelectAgency
   * @description Handle select a single agency action
   *
   * @param {object} agency selected agency object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectAgency = agency => {
    const { selectedAgencies } = this.state;
    this.setState({ selectedAgencies: concat([], selectedAgencies, agency) });
  };

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
   * @name handleSelectAll
   * @description Handle select all agencies actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedAgencies, selectedPages } = this.state;
    const { agencies, page } = this.props;
    const selectedList = uniqBy([...selectedAgencies, ...agencies], '_id');
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedAgencies: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all agencies in a current page
   *
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { agencies, page } = this.props;
    const { selectedAgencies, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedAgencies], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    agencies.forEach(agency => {
      remove(
        selectedList,
        item => item._id === agency._id // eslint-disable-line
      );
    });

    this.setState({
      selectedAgencies: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleOnDeselectAgency
   * @description Handle deselect a single agency action
   *
   * @param {object} agency agency to be removed from selected agencies
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectAgency = agency => {
    const { selectedAgencies } = this.state;
    const selectedList = [...selectedAgencies];

    remove(
      selectedList,
      item => item._id === agency._id // eslint-disable-line
    );

    this.setState({ selectedAgencies: selectedList });
  };

  render() {
    const {
      agencies,
      loading,
      page,
      total,
      onEdit,
      onNotify,
      onFilter,
      onShare,
      onBulkShare,
    } = this.props;
    const { selectedAgencies, selectedPages } = this.state;
    const selectedAgenciesCount = intersectionBy(
      selectedAgencies,
      agencies,
      '_id'
    ).length;

    return (
      <>
        {/* toolbar */}
        <Toolbar
          itemName="Agency"
          page={page}
          total={total}
          selectedItemsCount={selectedAgenciesCount}
          exportUrl={getAgenciesExportUrl({
            filter: { _id: map(selectedAgencies, '_id') },
          })}
          onNotify={() => onNotify(selectedAgencies)}
          onFilter={onFilter}
          onPaginate={nextPage => {
            paginateAgencies(nextPage);
          }}
          onRefresh={refreshAgencies}
          onShare={() => onBulkShare(selectedAgencies)}
        />
        {/* end toolbar */}

        {/* agency list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end agency list header */}

        {/* agencies list */}
        <List
          loading={loading}
          dataSource={agencies}
          renderItem={agency => {
            const {
              location: { name: area },
            } = agency;
            return (
              <AgencyListItem
                key={agency._id} // eslint-disable-line
                abbreviation={agency.abbreviation}
                name={agency.name}
                title={agency.role ? agency.role.name : 'N/A'}
                email={agency.email}
                area={area}
                mobile={agency.mobile}
                onShare={() => {
                  onShare(agency);
                }}
                isSelected={
                  // eslint-disable-next-line
                  map(selectedAgencies, item => item._id).includes(agency._id)
                }
                onSelectItem={() => {
                  this.handleOnSelectAgency(agency);
                }}
                onDeselectItem={() => {
                  this.handleOnDeselectAgency(agency);
                }}
                onEdit={() => onEdit(agency)}
                onArchive={() =>
                  deleteAgency(
                    agency._id, // eslint-disable-line
                    () => {
                      notifySuccess('Agency was archived successfully');
                    },
                    () => {
                      notifyError(
                        'An Error occurred while archiving Agency please agency system administrator'
                      );
                    }
                  )
                }
              />
            );
          }}
        />
        {/* end agencies list */}
      </>
    );
  }
}

AgencyList.propTypes = {
  loading: PropTypes.bool.isRequired,
  agencies: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired,
  onBulkShare: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default AgencyList;
