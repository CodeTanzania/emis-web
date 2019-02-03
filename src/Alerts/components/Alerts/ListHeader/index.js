import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 7, header: 'Event', offset: 1 },
  { span: 2, header: 'Severity' },
  { span: 2, header: 'Certainty' },
  { span: 2, header: 'Urgency' },
  { span: 2, header: 'Expected' },
  { span: 2, header: 'Expires' },
  { span: 3, header: 'Source' },
];

const AlertsListHeader = () => (
  <Row className="AlertsListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default AlertsListHeader;
