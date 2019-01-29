import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 8, header: 'Label', offset: 1 },
  { span: 3, header: 'Phase' },
  { span: 4, header: 'Assess' },
  { span: 3, header: 'Stage' },
];

const QuestionsListHeader = () => (
  <Row className="QuestionsListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default QuestionsListHeader;
