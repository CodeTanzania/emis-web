import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import EvacuationCenterListHeader from '../ListHeader';
import EvacuationCenterListItem from '../ListItem';

/**
 * Render Evacuation Center list which have search box and actions
 *
 * @class
 * @name EvacuationCenterList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const EvacuationCenterList = ({ evacuationCenters, loading, onEdit }) => (
  <Fragment>
    <EvacuationCenterListHeader />
    <List
      loading={loading}
      dataSource={evacuationCenters}
      renderItem={evacuationCenter => (
        <EvacuationCenterListItem
          key={evacuationCenter.name}
          name={evacuationCenter.name}
          level={evacuationCenter.type}
          onEdit={() => onEdit(evacuationCenter)}
        />
      )}
    />
  </Fragment>
);

EvacuationCenterList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  evacuationCenters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default EvacuationCenterList;
