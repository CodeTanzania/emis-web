import { Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

/**
 * @function
 * @name ListHeader
 * @description List header component
 *
 * @param {Object} props props object
 * @param {Object[]} props.headerLayout list of header items configs
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ListHeader = ({ headerLayout }) => (
  <Row className="ListHeader">
    <Col xl={{ span: 1 }} xxl={{ span: 1 }}>
      <Checkbox className="checkbox" />
    </Col>

    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

/* props validation */
ListHeader.propTypes = {
  headerLayout: PropTypes.arrayOf(
    PropTypes.shape({
      span: PropTypes.number.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListHeader;
