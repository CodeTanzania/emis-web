import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 6, header: 'Subject', offset: 1 },
  { span: 6, header: 'Topic' },
  { span: 8, header: 'Description' },
];

/**
 * @function
 * @name IndicatorsListHeader
 * @description Render list headers
 * @returns {object} react element
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const IndicatorsListHeader = () => (
  <Row className="IndicatorsListHeader">
    {headerLayout.map(item => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default IndicatorsListHeader;
