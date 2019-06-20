import {
  deleteAlert,
  paginateAlerts,
  refreshAlerts,
} from '@codetanzania/emis-api-states';
import { httpActions } from '@codetanzania/emis-api-client';
import { List } from 'antd';
import moment from 'moment';
import concat from 'lodash/concat';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';
import intersectionBy from 'lodash/intersectionBy';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ListHeader from '../../../../components/ListHeader';
import { notifyError, notifySuccess } from '../../../../util';
import Toolbar from '../../../../components/Toolbar';
import AlertListItem from '../ListItem';

const headerLayout = [
  { span: 7, header: 'Event' },
  { span: 2, header: 'Severity' },
  { span: 2, header: 'Certainty' },
  { span: 2, header: 'Urgency' },
  { span: 2, header: 'Expected' },
  { span: 2, header: 'Expires' },
  { span: 3, header: 'Source' },
];
const { getAlertsExportUrl } = httpActions;

/**
 * @function
 * @name dateSortDesc
 * @description This is a comparison function that will result in dates being
 *  sorted in DESCENDING order
 *
 * @param {object} date1 first date object
 * @param {object} date2 second date object
 *
 * @returns {number} result
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const dateSortDesc = (date1, date2) => {
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
};

/**
 * @function
 * @name sortByExpiredAt
 * @description Sorts alerts  in ASCENDING ORDER by expiredAt field
 *
 * @param {Array} alerts alerts to be sorted
 *
 * @returns {Array} sorted Alerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const sortByExpiredAt = alerts =>
  alerts.sort(({ expiredAt: ISOdate1 }, { expiredAt: ISOdate2 }) => {
    const date1 = moment(ISOdate1);
    const date2 = moment(ISOdate2);
    return dateSortDesc(date1, date2);
  });

/**
 * @function
 * @name sortByUpdatedAt
 * @description Sorts alerts  in DESCENDING ORDER by updatedAt field
 *
 * @param {Array} alerts alerts to be filtered
 *
 * @returns {Array} sortedAlerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const sortByUpdatedAt = alerts =>
  alerts.sort(({ updatedAt: ISOdate1 }, { updatedAt: ISOdate2 }) => {
    const date1 = moment(ISOdate1);
    const date2 = moment(ISOdate2);
    return dateSortDesc(date1, date2);
  });

/**
 * @class
 * @name AlertList
 * @description Render AlertList component which have actionBar, alerts header and
 * alert list item components
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    alerts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
  };

  state = {
    selectedAlerts: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnSelectAlert
   * @description Handle select a single alert action
   *
   * @param {object} alert selected alert object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectAlert = alert => {
    const { selectedAlerts } = this.state;
    this.setState({ selectedAlerts: concat([], selectedAlerts, alert) });
  };

  /**
   * @function
   * @name handleFilterByStatus
   * @description Handle filter alerts by status action
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
   * @description Handle select all alerts actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedAlerts, selectedPages } = this.state;
    const { alerts, page } = this.props;
    const selectedList = uniqBy([...selectedAlerts, ...alerts], '_id');
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedAlerts: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all alerts in a current page
   *
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { alerts, page } = this.props;
    const { selectedAlerts, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedAlerts], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    alerts.forEach(alert => {
      remove(
        selectedList,
        item => item._id === alert._id // eslint-disable-line
      );
    });

    this.setState({
      selectedAlerts: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleOnDeselectAlert
   * @description Handle deselect a single alert action
   *
   * @param {object} alert alert to be removed from selected alerts
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectAlert = alert => {
    const { selectedAlerts } = this.state;
    const selectedList = [...selectedAlerts];

    remove(
      selectedList,
      item => item._id === alert._id // eslint-disable-line
    );

    this.setState({ selectedAlerts: selectedList });
  };

  render() {
    const {
      alerts,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onShare,
    } = this.props;
    const { selectedAlerts, selectedPages } = this.state;
    const sortedAlerts = sortByUpdatedAt(sortByExpiredAt(alerts));
    const selectedAlertsCount = intersectionBy(
      this.state.selectedAlerts,
      alerts,
      '_id'
    ).length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="Alert"
          page={page}
          total={total}
          selectedItemsCount={selectedAlertsCount}
          exportUrl={getAlertsExportUrl({
            filter: { _id: map(selectedAlerts, '_id') },
          })}
          onFilter={onFilter}
          onPaginate={nextPage => {
            paginateAlerts(nextPage);
          }}
          onRefresh={() =>
            refreshAlerts(
              () => {
                notifySuccess('Alerts refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Alerts please contact system administrator'
                );
              }
            )
          }
        />
        {/* end toolbar */}

        {/* alert list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end alert list header */}

        {/* alerts list */}
        <List
          loading={loading}
          dataSource={sortedAlerts}
          renderItem={alert => {
            return (
              <AlertListItem
                key={alert._id} // eslint-disable-line
                abbreviation={alert.source.toUpperCase().charAt(0)}
                urgency={alert.urgency}
                area={alert.area}
                certainty={alert.certainty}
                event={alert.event}
                headline={alert.headline}
                description={alert.description}
                source={alert.source}
                color={alert.color}
                reportedAt={alert.reportedAt}
                expiredAt={alert.expiredAt}
                expectedAt={alert.expectedAt}
                severity={alert.severity}
                onShare={() => {
                  onShare(alert);
                }}
                isSelected={
                  // eslint-disable-next-line
                  map(selectedAlerts, item => item._id).includes(alert._id)
                }
                onSelectItem={() => {
                  this.handleOnSelectAlert(alert);
                }}
                onDeselectItem={() => {
                  this.handleOnDeselectAlert(alert);
                }}
                onEdit={() => onEdit(alert)}
                onArchive={() =>
                  deleteAlert(
                    alert._id, // eslint-disable-line
                    () => {
                      notifySuccess('Alert was archived successfully');
                    },
                    () => {
                      notifyError(
                        'An Error occurred while archiving Alert please alert system administrator'
                      );
                    }
                  )
                }
              />
            );
          }}
        />
        {/* end alerts list */}
      </Fragment>
    );
  }
}

export default AlertList;
