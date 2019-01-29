import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 5, header: 'Name', offset: 1 },
  { span: 6, header: 'Designation' },
  { span: 4, header: 'Email Address' },
  { span: 4, header: 'Mobile Number' },
];

const DistrictsListHeader = () => (
  <Row className="ContactListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default DistrictsListHeader;
