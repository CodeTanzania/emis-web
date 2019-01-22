import React from 'react';
import UIState from '../../components/UIState';

const AlertSourcesLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Alert Sources yet,but when you create an Alert Source it will appear here"
      buttonLabel="New Alert"
      onClick={() => {}}
    />
  </div>
);

export default AlertSourcesLayout;
