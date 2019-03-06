import React from 'react';
import EmptyState from '../../components/EmptyState';

const IncidentsLossDatabaseLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <EmptyState
      icon="exclamation-circle"
      description="No Incidents Loss Database yet,but when they are available will appear here"
      buttonLabel="New Incident"
      onClick={() => {}}
    />
  </div>
);

export default IncidentsLossDatabaseLayout;
