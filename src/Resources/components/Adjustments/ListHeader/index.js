import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 4, header: 'Item', offset: 1 },
  { span: 3, header: 'Action' },
  { span: 2, header: 'Quantity' },
  { span: 3, header: 'Cost' },
  { span: 4, header: 'Reason' },
  { span: 4, header: 'Warehouse' },
];

/**
 * @function
 * @name AdjustmentListHeader
 * @description Render adjustment list metadata
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AdjustmentListHeader = () => (
  <Row className="AdjustmentListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default AdjustmentListHeader;
