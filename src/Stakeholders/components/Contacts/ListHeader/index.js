import { Col, Row } from 'antd';
import React from 'react';
import './styles.css';

const headerLayout = [
  { span: 5, header: 'Name', offset: 1 },
  { span: 6, header: 'Role' },
  { span: 4, header: 'Mobile Number' },
  { span: 4, header: 'Email Address' },
];

const ContactsListHeader = () => (
  <Row className="ContactListHeader">
    {headerLayout.map(item => (
      <Col key={item.header} {...item}>
        <h4 className="title">{item.header}</h4>
      </Col>
    ))}
  </Row>
);

export default ContactsListHeader;
