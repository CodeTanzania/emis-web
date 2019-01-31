import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 9, header: 'Headline', offset: 1 },
  { span: 3, header: 'Expected At' },
  { span: 3, header: 'Expires At' },
  { span: 5, header: 'Issued By' },
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
