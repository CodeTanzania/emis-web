import React from 'react';
import UIState from '../../components/UIState';

const AssessmentIndicatorsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Assessments Indicators yet,but when they are available will appear here"
      buttonLabel="New Assessment"
      onClick={() => {}}
    />
  </div>
);

export default AssessmentIndicatorsLayout;
