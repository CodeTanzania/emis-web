import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import DistrictsListItem from '../ListItem';
import DistrictsListHeader from '../ListHeader';

const DistrictsList = ({ districts, loading }) => (
  <Fragment>
    <DistrictsListHeader />
    <List
      loading={loading}
      dataSource={districts}
      renderItem={district => (
        <DistrictsListItem
          key={district.name}
          name={district.name}
          category={district.category}
          type={district.type}
          country={district.country}
        />
      )}
    />
  </Fragment>
);

DistrictsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  districts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default DistrictsList;
