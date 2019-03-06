import React from 'react';
import EmptyState from '../../components/EmptyState';

const EmergencyPlansDisseminationsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <EmptyState
      icon="exclamation-circle"
      description="No Emergency Plans Dissemination yet,but when they are available will appear here"
      buttonLabel="New Plan"
      onClick={() => {}}
    />
  </div>
);

export default EmergencyPlansDisseminationsLayout;
