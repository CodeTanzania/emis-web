import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import RegionsListItem from '../ListItem';
import RegionsListHeader from '../LIstHeader';

const RegionsList = ({ regions, loading }) => (
  <Fragment>
    <RegionsListHeader />
    <List
      loading={loading}
      dataSource={regions}
      renderItem={region => (
        <RegionsListItem
          key={region.name}
          name={region.name}
          category={region.category}
          type={region.type}
          country={region.country}
        />
      )}
    />
  </Fragment>
);

RegionsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  regions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default RegionsList;