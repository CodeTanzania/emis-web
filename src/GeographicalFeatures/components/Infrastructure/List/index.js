import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import CriticalInfrastructureListHeader from '../ListHeader';
import CriticalInfrastructureListItem from '../ListItem';

/**
 * Render Critical infrastructure list which have search box and actions
 *
 * @class
 * @name CriticalInfrastructureList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const CriticalInfrastructureList = ({
  criticalInfrastructures,
  loading,
  onEdit,
}) => (
  <Fragment>
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
  </Fragment>
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
