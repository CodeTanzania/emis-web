import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 6, header: 'Name', offset: 1 },
  { span: 6, header: 'Type' },
  { span: 8, header: 'Description' },
];

const ItemsListHeader = () => (
  <Row className="ItemsListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default ItemsListHeader;
