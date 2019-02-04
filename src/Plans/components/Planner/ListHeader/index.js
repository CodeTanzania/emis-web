import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 5, header: 'Plan For', offset: 1 },
  { span: 9, header: 'Plan By' },
  { span: 4, header: 'Location' },
];

const PlansListHeader = () => (
  <Row className="PlanListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default PlansListHeader;
