import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 6, header: 'Name', offset: 1 },
  { span: 5, header: 'Activity' },
  { span: 2, header: 'Incident Type' },
  { span: 2, header: 'SOP Phase' },
  { span: 5, header: 'SOP owner' },
];

const ProceduresListHeader = () => (
  <Row className="ProcedureListHeader">
    {headerLayout.map(item => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default ProceduresListHeader;
