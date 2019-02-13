import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 5, header: 'Name', offset: 1 },
  { span: 6, header: 'Nature' },
  { span: 4, header: 'Type' },
  { span: 4, header: 'family' },
];

/**
 * @function
 * @name WardsListHeader
 * @description Render list headers
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const WardsListHeader = () => (
  <Row className="WardsListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default WardsListHeader;
