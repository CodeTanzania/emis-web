import React from 'react';
import UIState from '../../components/UIState';

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
