import React from 'react';
import UIState from '../../components/UIState';

const EmergencyPlansProceduresLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Procedures yet,but when they are available will appear here"
      buttonLabel="New Plan"
      onClick={() => {}}
    />
  </div>
);

export default EmergencyPlansProceduresLayout;
