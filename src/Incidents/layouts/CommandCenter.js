import React from 'react';
import EmptyState from '../../components/EmptyState';

const IncidentsCommandCenterLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <EmptyState
      icon="exclamation-circle"
      description="No Command Center yet,but when they are available will appear here"
      buttonLabel="New Incident"
      onClick={() => {}}
    />
  </div>
);

export default IncidentsCommandCenterLayout;
