import React from 'react';
import UIState from '../../components/UIState';

const IncidentsFeedsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Incidents Feeds yet,but when they are available will appear here"
      buttonLabel="New Incident"
      onClick={() => {}}
    />
  </div>
);

export default IncidentsFeedsLayout;
