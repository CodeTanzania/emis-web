import { Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

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

ListHeader.propTypes = {
  headerLayout: PropTypes.arrayOf(
    PropTypes.shape({
      span: PropTypes.number.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListHeader;
