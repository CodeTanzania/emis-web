import { List } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import AlertsListHeader from '../ListHeader';
import AlertListItem from '../ListItem';

/**
 * This is a comparison function that will result in dates being sorted in DESCENDING order
 *
 * @function
 * @name dateSortDesc
 *
 * @param {Object} date1
 * @param {Object} date2
 *
 * @returns {Number} result
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
 * Sorts alerts  in ESCENDING ORDER by expiredAt field
 *
 * @function
 * @name sortByExpiredAt
 *
 * @param {Array} alerts
 *
 * @returns {Array} sortedAlerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const sortByExpiredAt = arr =>
  arr.sort(({ expiredAt: ISOdate1 }, { expiredAt: ISOdate2 }) => {
    const date1 = moment(ISOdate1);
    const date2 = moment(ISOdate2);
    return dateSortDesc(date1, date2);
  });

/**
 * Sorts alerts  in ESCENDING ORDER by updatedAt field
 *
 * @function
 * @name sortByUpdatedAt
 *
 * @param {Array} alerts
 *
 * @returns {Array} sortedAlerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const sortByUpdatedAt = arr =>
  arr.sort(({ updatedAt: ISOdate1 }, { updatedAt: ISOdate2 }) => {
    const date1 = moment(ISOdate1);
    const date2 = moment(ISOdate2);
    return dateSortDesc(date1, date2);
  });

const AlertList = ({ alerts, loading, onEdit }) => {
  const sortedAlerts = sortByUpdatedAt(sortByExpiredAt(alerts));
  return (
    <Fragment>
      <AlertsListHeader />
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
};

AlertList.propTypes = {
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
};

export default AlertList;
