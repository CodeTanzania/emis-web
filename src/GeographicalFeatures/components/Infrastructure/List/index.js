import { List } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import CriticalInfrastructureListHeader from '../ListHeader';
import CriticalInfrastructureListItem from '../ListItem';

/**
 * @function
 * @name CriticalInfrastructureList
 * @description Render Critical Infrastructure list
 *
 * @param {object} props props object
 * @param {boolean} props.loading preload list of Critical Infrastructure
 * @param {Array} props.districts array list of Critical Infrastructure
 * @param {Function} props.onEdit function for editing Critical Infrastructure
 *
 * @returns {object} React component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const CriticalInfrastructureList = ({
  criticalInfrastructures,
  loading,
  onEdit,
}) => (
  <>
    <CriticalInfrastructureListHeader />
    <List
      loading={loading}
      dataSource={criticalInfrastructures}
      renderItem={criticalInfrastructure => (
        <CriticalInfrastructureListItem
          key={criticalInfrastructure.name}
          name={criticalInfrastructure.name}
          type={criticalInfrastructure.type}
          onEdit={() => onEdit(criticalInfrastructure)}
        />
      )}
    />
  </>
);

CriticalInfrastructureList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  criticalInfrastructures: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default CriticalInfrastructureList;
