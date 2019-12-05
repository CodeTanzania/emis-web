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
 * @returns {object} react element
 *
 * @param {object} props props object
 * @param {object} props.search on Search callback
 * @param {object[]} props.actions list of primary actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Topbar = ({ search, actions }) => (
  <Row className="Topbar">
    {/* search box */}
    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Search {...search} allowClear className="TopbarSearch" />
    </Col>
    {/* end search box */}

    {/* primary actions */}
    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
      <Row type="flex" justify="end">
        {actions.map(action => {
          const { label, ...props } = action;

          return (
            <Col xxl={6} xl={7} lg={10} md={12} sm={24} xs={24} key={label}>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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
