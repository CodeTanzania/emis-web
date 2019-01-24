import { getStakeholders } from '@codetanzania/emis-api-states';
import { Checkbox, Col, Icon, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Render action bar for actions which are applicable to list content
 *
 * @function
 * @name ContactsActionBar
 *
 * @param {Object} props
 * @param {page} props.page
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ContactsActionBar = ({ page, total }) => (
  <div className="ContactsActionBar">
    <Row>
      <Col span={1} xl={1} style={{ paddingLeft: 8 }}>
        <Checkbox />
      </Col>
      <Col span={1} xl={1}>
        <span className="actionIcon">
          <Icon
            type="reload"
            title="Refresh Contacts"
            onClick={() => getStakeholders()}
          />
        </span>
      </Col>
      <Col span={1} xl={1}>
        <Icon type="message" title="Send SMS to Selected Contacts" />
      </Col>
      <Col
        span={1}
        offset={17}
        xl={{ span: 1, offset: 16 }}
        xxl={{ span: 1, offset: 17 }}
      >
        <Icon type="filter" title="Filter Contacts" />
      </Col>
      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={page}
          total={total}
          onChange={nextPage => getStakeholders({ page: nextPage })}
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
ContactsActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default ContactsActionBar;
