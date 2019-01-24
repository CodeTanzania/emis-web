import React from 'react';
import UIState from '../../components/UIState';

const ResourceItemsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Resources Items yet,but when they are available will appear here"
      buttonLabel="New Resource"
      onClick={() => {}}
    />
  </div>
);

export default ResourceItemsLayout;
