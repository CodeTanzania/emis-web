import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 5, header: 'Organisation', offset: 1 },
  { span: 3, header: 'Email' },
  { span: 3, header: 'Phone' },
  { span: 4, header: 'Website' },
  { span: 5, header: 'Feed' },
];

const AlertSourcesListHeader = () => (
  <Row className="AlertSourcesListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default AlertSourcesListHeader;
