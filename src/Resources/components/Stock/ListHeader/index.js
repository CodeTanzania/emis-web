import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 5, header: 'Stakeholder', offset: 1 },
  { span: 5, header: 'Item' },
  { span: 5, header: 'Quantity (Unit)' },
  { span: 5, header: 'Warehouse' },
];

/**
 * @function
 * @name StockListHeader
 * @description display stock list metadata
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const StockListHeader = () => (
  <Row className="StockListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default StockListHeader;
