import React from 'react';
import UIState from '../../components/UIState';

/**
 * @function
 * @name AlertFeedbackLayout
 * @description Render alert feedback layout
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AlertFeedbackLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Alerts Feedback yet,but when they are available will appear here"
      buttonLabel="New Alert"
      onClick={() => {}}
    />
  </div>
);

export default AlertFeedbackLayout;
