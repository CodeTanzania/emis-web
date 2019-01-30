import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import SourcesListHeader from '../ListHeader';
import SourcesListItem from '../ListItem';

const SourceList = ({ sources, loading }) => (
  <Fragment>
    <SourcesListHeader />
    <List
      loading={loading}
      dataSource={sources}
      renderItem={({ _id: id, name, url, email, mobile }) => (
        <SourcesListItem
          key={id}
          name={name}
          url={url}
          email={email}
          mobile={mobile}
        />
      )}
    />
  </Fragment>
);

SourceList.propTypes = {
  loading: PropTypes.bool.isRequired,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
      _id: PropTypes.string,
    })
  ).isRequired,
};

export default SourceList;
