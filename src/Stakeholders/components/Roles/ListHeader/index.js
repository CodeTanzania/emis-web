import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 7, header: 'Name', offset: 1 },
  { span: 3, header: 'Abbreviation' },
  { span: 10, header: 'Description' },
];

const RoleListHeader = () => (
  <Row className="RoleListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default RoleListHeader;
