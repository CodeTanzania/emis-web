import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 5, header: 'Name', offset: 1 },
  { span: 4, header: 'Nature' },
  { span: 4, header: 'Family' },
  { span: 4, header: 'Cap' },
  { span: 4, header: 'Code' },
];

const IncidentTypesListHeader = () => (
  <Row className="IncidentTypesListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default IncidentTypesListHeader;
