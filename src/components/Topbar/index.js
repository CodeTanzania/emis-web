import React from 'react';
import { Button, Row, Col, Input } from 'antd';
import PropTypes from 'prop-types';
import './styles.css';

/* constants */
const { Search } = Input;

/**
 * @function
 * @name Topbar
 * @description Topbar component which renders search input and primary actions
 *
 * @param {Object} props props object
 * @param {Object} props.search on Search callback
 * @param {Object[]} props.actions list of primary actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Topbar = ({ search, actions }) => (
  <Row className="Topbar">
    {/* search box */}
    <Col span={12} sm={24} xs={24}>
      <Search {...search} allowClear className="TopbarSearch" />
    </Col>
    {/* end search box */}

    {/* primary actions */}
    <Col span={12} sm={24} xs={24}>
      <Row type="flex" justify="end">
        {actions.map(action => {
          const { label, ...props } = action;

          return (
            <Col span={12} sm={24} xs={24} key={label}>
              <Button {...props} type="primary" block>
                {label}
              </Button>
            </Col>
          );
        })}
      </Row>
    </Col>
    {/* end primary actions */}
  </Row>
);

/* props validations */
Topbar.propTypes = {
  search: PropTypes.shape({
    placeholder: PropTypes.string,
    size: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      title: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

Topbar.defaultProps = {
  actions: [],
};

export default Topbar;
