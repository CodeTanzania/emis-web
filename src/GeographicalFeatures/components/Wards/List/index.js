import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import WardsListItem from '../ListItem';
import WardsListHeader from '../ListHeader';

const WardsList = ({ wards, loading, onEdit }) => (
  <Fragment>
    <WardsListHeader />
    <List
      loading={loading}
      dataSource={wards}
      renderItem={ward => (
        <WardsListItem
          key={ward.name}
          name={ward.name}
          nature={ward.nature}
          type={ward.type}
          family={ward.family}
          onEdit={() => onEdit(ward)}
        />
      )}
    />
  </Fragment>
);

WardsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  wards: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default WardsList;
