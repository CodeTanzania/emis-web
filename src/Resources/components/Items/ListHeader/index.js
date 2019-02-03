import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

/**
 * list item header component.
 * Render item header
 *
 * @function
 * @name ItemsList
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const headerLayout = [
  { span: 6, header: 'Name', offset: 1 },
  { span: 3, header: 'Type' },
  { span: 2, header: 'Maximum' },
  { span: 2, header: 'Minimun' },
  { span: 7, header: 'Description' },
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
