import { httpActions } from '@codetanzania/emis-api-client';

import { paginateAlerts, refreshAlerts } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import moment from 'moment';
import map from 'lodash/map';
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
  { span: 3, header: 'Source' },
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
      page,
      total,
      onFilter,
      onNotify,
    } = this.props;
    const sortedAlerts = this.sortByUpdatedAt(this.sortByExpiredAt(alerts));
    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="Alerts"
          page={page}
          total={total}
          onFilter={onFilter}
          exportUrl={getAlertsExportUrl({
            filter: { _id: map('_id') },
          })}
          onNotify={() => onNotify()}
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
        {/* focalPerson list header */}
        <ListHeader headerLayout={headerLayout} />
        {/* end focalPerson list header */}{' '}
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
                onEdit={() => onEdit(alert)}
              />
            );
          }}
        />
      </Fragment>
    );
  }
}

export default AlertList;
