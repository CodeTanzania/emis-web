import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import WardsListItem from '../ListItem';
import WardsListHeader from '../ListHeader';

const WardsList = ({ wards, loading }) => (
  <Fragment>
    <WardsListHeader />
    <List
      loading={loading}
      dataSource={wards}
      renderItem={ward => (
        <WardsListItem
          key={ward.name}
          name={ward.name}
          category={ward.category}
          type={ward.type}
          country={ward.country}
        />
      )}
    />
  </Fragment>
);

WardsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  wards: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default WardsList;
