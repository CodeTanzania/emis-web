import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

/**
 * @description Empty/ Error state component
 *
 * @param {Object} props props object
 * @param {string} props.icon state icon
 * @param {string} props.description description of the component state
 * @param {string} props.buttonLabel button label
 * @param {Function} props.onClick function called when button is clicked
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const UIState = ({ icon, description, buttonLabel, onClick }) => (
  <div className="UIState">
    <Icon type={icon} className="Icon" />
    <p className="description">{description}</p>
    <Button onClick={onClick}>{buttonLabel}</Button>
  </div>
);

/* Props validation */
UIState.propTypes = {
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UIState;
