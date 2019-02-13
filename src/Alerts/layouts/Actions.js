import React from 'react';
import UIState from '../../components/UIState';

/**
 * @function
 * @name AlertActionsLayout
 * @description Render alert actions layout
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AlertActionsLayout = () => (
  <div style={{ marginTop: '20%' }}>
    <UIState
      icon="exclamation-circle"
      description="No Alerts Actions yet,but when they are available will appear here"
      buttonLabel="New Alert"
      onClick={() => {}}
    />
  </div>
);

export default AlertActionsLayout;
