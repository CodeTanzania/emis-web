import { List } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import WardsListItem from '../ListItem';
import WardsListHeader from '../ListHeader';

/**
 * @function
 * @name WardsList
 * @description Render Wards list
 *
 * @param {object} props props object
 * @param {boolean} props.loading preload list of wards
 * @param {Array} props.wards array list of wards
 * @param {Function} props.onEdit function for editing ward
 *
 * @returns {object} React Component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const WardsList = ({ wards, loading, onEdit }) => (
  <>
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
  </>
);

WardsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  wards: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default WardsList;
