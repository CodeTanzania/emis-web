import React from 'react';
import UIState from '../../components/UIState';

const IncidentsAssessmentsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Alerts Assessments yet,but when they are available will appear here"
      buttonLabel="New Alert"
      onClick={() => {}}
    />
  </div>
);

export default IncidentsAssessmentsLayout;
