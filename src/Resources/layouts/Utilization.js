import React from 'react';
import UIState from '../../components/UIState';

/**
 * @function
 * @name ResourcesUtilizationLayout
 * @description Render resources utilizations layout
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ResourcesUtilizationLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Resources Utilization yet,but when they are available will appear here"
      buttonLabel="New Resource"
      onClick={() => {}}
    />
  </div>
);

export default ResourcesUtilizationLayout;
