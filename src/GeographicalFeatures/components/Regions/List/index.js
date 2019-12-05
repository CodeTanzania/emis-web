import { List } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import RegionsListItem from '../ListItem';
import RegionsListHeader from '../LIstHeader';

/**
 *
 * @function
 * @name RegionsList
 * @description Render Region list
 *
 * @param {object} props props object
 * @param {boolean} props.loading preload list of region
 * @param {Array} props.regions array list of region
 * @param {Function} props.onEdit function for editing region
 *
 * @returns {object} React Component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const RegionsList = ({ regions, loading, onEdit }) => (
  <>
    <RegionsListHeader />
    <List
      loading={loading}
      dataSource={regions}
      renderItem={region => (
        <RegionsListItem
          key={region.name}
          name={region.name}
          nature={region.nature}
          type={region.type}
          family={region.family}
          onEdit={() => onEdit(region)}
        />
      )}
    />
  </>
);

RegionsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  regions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default RegionsList;
