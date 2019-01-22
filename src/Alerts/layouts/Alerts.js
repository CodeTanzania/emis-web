import React from 'react';
import UIState from '../../components/UIState';

const AlertsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Alerts yet,but when you create an Alert it will appear here"
      buttonLabel="New Alert"
      onClick={() => {}}
    />
  </div>
);

export default AlertsLayout;
