import React from 'react';
import EmptyState from '../../components/EmptyState';

const StakeholdersNotificationsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <EmptyState
      icon="exclamation-circle"
      description="No Alerts Actions yet,but when they are available will appear here"
      buttonLabel="New Alert"
      onClick={() => {}}
    />
  </div>
);

export default StakeholdersNotificationsLayout;
