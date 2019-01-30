import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import AlertSourcesListHeader from '../ListHeader';
import AlertSourcesListItem from '../ListItem';

/**
 * Render source list which has search box and actions
 *
 * @function
 * @name AlertSourcesList
 * @param {Object} props
 * @param {string} props.sources
 * @param {string} props.loading
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AlertSourceList = ({ alertSources, loading }) => (
  <Fragment>
    <AlertSourcesListHeader />
    <List
      loading={loading}
      dataSource={alertSources}
      renderItem={({ _id: id, name, url, email, mobile, website }) => (
        <AlertSourcesListItem
          key={id}
          name={name}
          url={url}
          email={email}
          mobile={mobile}
          website={website}
        />
      )}
    />
  </Fragment>
);

AlertSourceList.propTypes = {
  loading: PropTypes.bool.isRequired,
  alertSources: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
      _id: PropTypes.string,
    })
  ).isRequired,
};

export default AlertSourceList;
