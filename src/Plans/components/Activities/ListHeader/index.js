import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 7, header: 'Name', offset: 1 },
  { span: 6, header: 'Incident Type' },
  { span: 6, header: 'Phase' },
];

const ActivitiesListHeader = () => (
  <Row className="ActivityListHeader">
    {headerLayout.map(item => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default ActivitiesListHeader;
