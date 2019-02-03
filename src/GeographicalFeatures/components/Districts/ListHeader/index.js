import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 5, header: 'Name', offset: 1 },
  { span: 6, header: 'Nature' },
  { span: 4, header: 'Type' },
  { span: 4, header: 'Family' },
];

const DistrictsListHeader = () => (
  <Row className="DistrictsListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default DistrictsListHeader;
