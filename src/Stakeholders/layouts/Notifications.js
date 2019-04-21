import React from 'react';
import EmptyState from '../../components/EmptyState';

/**
 * @function
 * @name StakeholdersNotificationsLayout
 * @description Stakeholder Notification Layout
 *
 * @version 0.1.0
 * @since 0.1.0
 */
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
