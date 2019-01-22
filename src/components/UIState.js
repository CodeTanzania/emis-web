import { Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

/**
 * Empty/ Error state component
 *
 * @param {Object} props
 * @param {string} props.icon
 * @param {string} props.description
 * @param {string} props.buttonLabel
 * @param {function} props.onClick
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
