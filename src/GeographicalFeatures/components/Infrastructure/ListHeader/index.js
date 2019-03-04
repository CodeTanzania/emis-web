import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 5, header: 'Name', offset: 1 },
  { span: 6, header: 'Type', offset: 4 },
];

/**
 * @function
 * @name CriticalInfrastructureListHeader
 * @description Render list headers
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const CriticalInfrastructureListHeader = () => (
  <Row className="CriticalInfrastructureListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default CriticalInfrastructureListHeader;
