import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import AlertsListHeader from '../ListHeader';
import AlertListItem from '../ListItem';

const AlertList = ({ alerts, loading, onEdit }) => (
  <Fragment>
    <AlertsListHeader />
    <List
      loading={loading}
      dataSource={alerts}
      renderItem={alert => {
        const {
          _id: id,
          event,
          source,
          color,
          headline,
          description,
          reportedAt,
          expiredAt,
          expectedAt,
        } = alert;
        return (
          <AlertListItem
            key={id}
            abbreviation={source.toUpperCase().charAt(0)}
            event={event}
            headline={headline}
            description={description}
            source={source}
            color={color}
            reportedAt={reportedAt}
            expiredAt={expiredAt}
            expectedAt={expectedAt}
            onEdit={() => onEdit(alert)}
          />
        );
      }}
    />
  </Fragment>
);

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
