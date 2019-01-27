import React from 'react';
import UIState from '../../components/UIState';

const CriticalInfrastructureLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Critical infrastructures yet,but when they are available will appear here"
      buttonLabel="New Feature"
      onClick={() => {}}
    />
  </div>
);

export default CriticalInfrastructureLayout;
