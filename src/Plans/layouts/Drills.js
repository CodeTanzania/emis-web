import React from 'react';
import EmptyState from '../../components/EmptyState';

const EmergencyPlansDrillsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <EmptyState
      icon="exclamation-circle"
      description="No Drills yet,but when they are available will appear here"
      buttonLabel="New Plan"
      onClick={() => {}}
    />
  </div>
);

export default EmergencyPlansDrillsLayout;
