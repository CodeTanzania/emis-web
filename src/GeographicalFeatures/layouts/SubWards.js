import React from 'react';
import EmptyState from '../../components/EmptyState';

const SubWardsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <EmptyState
      icon="exclamation-circle"
      description="No Evacuation Centers yet,but when they are available will appear here"
      buttonLabel="New Feature"
      onClick={() => {}}
    />
  </div>
);

export default SubWardsLayout;
