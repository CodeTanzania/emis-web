import React from 'react';
import EmptyState from '../../components/EmptyState';

/**
 * @function
 * @name AlertsServiceRequestLayout
 * @description Render alert service requests layout
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AlertsServiceRequestLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <EmptyState
      icon="exclamation-circle"
      description="No Alert Sources yet,but when you create an Alert Source it will appear here"
      buttonLabel="New Alert"
      onClick={() => {}}
    />
  </div>
);

export default AlertsServiceRequestLayout;
