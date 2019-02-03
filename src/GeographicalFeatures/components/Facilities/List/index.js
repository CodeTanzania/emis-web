import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import FacilityListHeader from '../ListHeader';
import FacilityListItem from '../ListItem';

/**
 * Render Facility list which have search box and actions
 *
 * @class
 * @name FacilityList
 *
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
