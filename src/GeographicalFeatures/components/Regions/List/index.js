import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import RegionsListItem from '../ListItem';
import RegionsListHeader from '../LIstHeader';

// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @function
 * @name RegionsList
 * @description Render Region list
 *
 * @param {Object} props props object
 * @param {boolean} props.loading preload list of region
 * @param {Array} props.regions array list of region
 * @param {Function} props.onEdit function for editing region
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const RegionsList = ({ regions, loading, onEdit }) => (
  <Fragment>
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
  </Fragment>
);

RegionsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  regions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default RegionsList;
