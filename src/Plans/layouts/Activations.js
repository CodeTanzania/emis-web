import React from 'react';
import UIState from '../../components/UIState';

const EmergencyPlansActivationsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Emergency Plans Activations yet,but when they are available will appear here"
      buttonLabel="New Plan"
      onClick={() => {}}
    />
  </div>
);

export default EmergencyPlansActivationsLayout;
