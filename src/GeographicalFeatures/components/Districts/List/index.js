import { List } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import DistrictsListItem from '../ListItem';
import DistrictsListHeader from '../ListHeader';

/**
 * @function
 * @name DistrictsList
 * @description Render Districts list
 *
 * @param {object} props props object
 * @param {boolean} props.loading preload list of district
 * @param {Array} props.districts array list of district
 * @param {Function} props.onEdit function for editing district
 *
 * @returns {object} React component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const DistrictsList = ({ districts, loading, onEdit }) => (
  <>
    <DistrictsListHeader />
    <List
      loading={loading}
      dataSource={districts}
      renderItem={district => (
        <DistrictsListItem
          key={district.name}
          name={district.name}
          nature={district.nature}
          type={district.type}
          family={district.family}
          onEdit={() => onEdit(district)}
        />
      )}
    />
  </>
);

DistrictsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  districts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default DistrictsList;
