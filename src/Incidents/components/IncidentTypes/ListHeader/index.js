import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

/**
 *
 * @function
 * @name IncidentTypesListHeader
 * @description Incident Types list item component. Render Incident Type list
 *
 * @version 0.1.0
 * @since 0.1.0
 */

const headerLayout = [
  { span: 5, header: 'Name', offset: 1 },
  { span: 4, header: 'Nature' },
  { span: 4, header: 'Family' },
  { span: 4, header: 'Code' },
  { span: 4, header: 'Cap' },
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
