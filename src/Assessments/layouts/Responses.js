import React from 'react';
import EmptyState from '../../components/EmptyState';

const AssessmentResponsesLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <EmptyState
      icon="exclamation-circle"
      description="No Assessments Responses yet,but when they are available will appear here"
      buttonLabel="New Assessment"
      onClick={() => {}}
    />
  </div>
);

export default AssessmentResponsesLayout;
