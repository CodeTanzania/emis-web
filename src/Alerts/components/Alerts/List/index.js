import { httpActions } from '@codetanzania/emis-api-client';

import {
  paginateAlerts,
  refreshAlerts,
  deleteAlert,
} from '@codetanzania/emis-api-states';
import { List } from 'antd';
import moment from 'moment';
import intersectionBy from 'lodash/intersectionBy';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import ListHeader from '../../../../components/ListHeader';
import AlertListItem from '../ListItem';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';

const { getAlertsExportUrl } = httpActions;

const headerLayout = [
  { span: 7, header: 'Event' },
  { span: 2, header: 'Severity' },
  { span: 2, header: 'Certainty' },
  { span: 2, header: 'Urgency' },
  { span: 2, header: 'Expected' },
  { span: 2, header: 'Expires' },
  { span: 4, header: 'Source' },
];

class AlertList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    alerts: PropTypes.arrayOf(
      PropTypes.shape({
        event: PropTypes.string,
        headline: PropTypes.string,
        description: PropTypes.string,
        source: PropTypes.string,
        color: PropTypes.string.isRequired,
        reportedAt: PropTypes.string,
        expiredAt: PropTypes.string,
        expectedAt: PropTypes.string,
        _id: PropTypes.string,
      })
    ).isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onFilter: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
  };

  state = {
    selectedAlert: [],
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
    const { selectedAlert } = this.state;
    this.setState({
      selectedAlert: concat([], selectedAlert, alert),
    });
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
    const { selectedAlert, selectedPages } = this.state;
    const { alerts, page } = this.props;
    const selectedList = uniqBy([...selectedAlert, ...alerts], '_id');
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedAlert: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all alerts in a current page
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { alerts, page } = this.props;
    const { selectedAlert, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedAlert], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    alerts.forEach(alert => {
      remove(
        selectedList,
        item => item._id === alert._id // eslint-disable-line
      );
    });

    this.setState({
      selectedAlert: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleOnDeselectAlert
   * @description Handle deselect a single alert action
   *
   * @param {object} alert alert to be removed from selected alerts
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectAlert = alert => {
    const { selectedAlert } = this.state;
    const selectedList = [...selectedAlert];

    remove(
      selectedList,
      item => item._id === alert._id // eslint-disable-line
    );

    this.setState({ selectedAlert: selectedList });
  };

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
  dateSortDesc = (date1, date2) => {
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
  sortByExpiredAt = alerts =>
    alerts.sort(({ expiredAt: ISOdate1 }, { expiredAt: ISOdate2 }) => {
      const date1 = moment(ISOdate1);
      const date2 = moment(ISOdate2);
      return this.dateSortDesc(date1, date2);
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
  sortByUpdatedAt = alerts =>
    alerts.sort(({ updatedAt: ISOdate1 }, { updatedAt: ISOdate2 }) => {
      const date1 = moment(ISOdate1);
      const date2 = moment(ISOdate2);
      return this.dateSortDesc(date1, date2);
    });

  render() {
    const {
      alerts,
      loading,
      onEdit,
      onShare,
      page,
      total,
      onFilter,
      onNotify,
    } = this.props;
    const { selectedAlert, selectedPages } = this.state;
    const selectedAlertCount = intersectionBy(
      this.state.selectedAlert,
      alerts,
      '_id'
    ).length;

    const sortedAlerts = this.sortByUpdatedAt(this.sortByExpiredAt(alerts));
    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="Alerts"
          page={page}
          total={total}
          selectedItemsCount={selectedAlertCount}
          onFilter={onFilter}
          exportUrl={getAlertsExportUrl({
            filter: { _id: map('_id') },
          })}
          onNotify={() => onNotify(selectedAlert)}
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
                  'An Error occurred while refreshing alert please contact system administrator'
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
        {/* end alert list header */}{' '}
        <List
          loading={loading}
          dataSource={sortedAlerts}
          renderItem={alert => {
            const {
              _id: id,
              urgency,
              area,
              certainty,
              event,
              expiredAt,
              expectedAt,
              source,
              color,
              headline,
              description,
              reportedAt,
              severity,
            } = alert;
            return (
              <AlertListItem
                key={id}
                abbreviation={source.toUpperCase().charAt(0)}
                urgency={urgency}
                area={area}
                certainty={certainty}
                event={event}
                headline={headline}
                description={description}
                source={source}
                color={color}
                reportedAt={reportedAt}
                expiredAt={expiredAt}
                expectedAt={expectedAt}
                severity={severity}
                isSelected={
                  // eslint-disable-next-line
                  map(selectedAlert, item => item._id).includes(
                    alert._id // eslint-disable-line
                  )
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
                        'An Error occurred while archiving alert please contact system administrator'
                      );
                    }
                  )
                }
                onShare={() => {
                  onShare(alert);
                }}
              />
            );
          }}
        />
      </Fragment>
    );
  }
}

export default AlertList;
