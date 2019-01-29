import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import AlertsListHeader from '../ListHeader';
import AlertListItem from '../ListItem';

const AlertList = ({ alerts, loading }) => (
  <Fragment>
    <AlertsListHeader />
    <List
      loading={loading}
      dataSource={alerts}
      renderItem={({
        _id: id,
        headline,
        source,
        reportedAt,
        expiredAt,
        expectedAt,
      }) => (
        <AlertListItem
          key={id}
          abbreviation={source.toUpperCase().charAt(0)}
          headline={headline}
          source={source}
          reportedAt={reportedAt}
          expiredAt={expiredAt}
          expectedAt={expectedAt}
        />
      )}
    />
  </Fragment>
);

AlertList.propTypes = {
  loading: PropTypes.bool.isRequired,
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      headline: PropTypes.string,
      source: PropTypes.string,
      reportedAt: PropTypes.string,
      expiredAt: PropTypes.string,
      expectedAt: PropTypes.string,
      _id: PropTypes.string,
    })
  ).isRequired,
};

export default AlertList;
