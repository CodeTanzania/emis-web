import React from 'react';
import UIState from '../../components/UIState';

const AssessmentQuestionsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Assessments Questions yet,but when they are available will appear here"
      buttonLabel="New Assessment"
      onClick={() => {}}
    />
  </div>
);

export default AssessmentQuestionsLayout;
