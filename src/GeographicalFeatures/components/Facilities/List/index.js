import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import FacilityListHeader from '../ListHeader';
import FacilityListItem from '../ListItem';

// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @function
 * @name FacilityList
 * @description Render facilities list
 *
 * @param {Object} props props object
 * @param {boolean} props.loading preload list of facilities
 * @param {Array} props.districts array list of facilities
 * @param {Function} props.onEdit function for editing facilities
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const FacilityList = ({ facilities, loading, onEdit }) => (
  <Fragment>
    <FacilityListHeader />
    <List
      loading={loading}
      dataSource={facilities}
      renderItem={facility => (
        <FacilityListItem
          key={facility.name}
          name={facility.name}
          type={facility.type}
          onEdit={() => onEdit(facility)}
        />
      )}
    />
  </Fragment>
);

FacilityList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  facilities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default FacilityList;
