import { getStakeholders } from '@codetanzania/emis-api-states';
import { Checkbox, Col, Icon, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

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
        <span className="actionIcon" title="Refresh contacts">
          <Icon type="reload" onClick={() => getStakeholders()} />
        </span>
      </Col>

      <Col span={1} xl={1}>
        <span className="actionIcon" title="Send Email to selected contacts">
          <Icon type="mail" />
        </span>
      </Col>

      <Col span={1} xl={1}>
        <span className="actionIcon" title="Send SMS to selected contacts">
          <Icon type="message" />
        </span>
      </Col>

      <Col span={1} xl={1}>
        <span className="actionIcon" title="Export selected contacts">
          <Icon type="cloud-download" />
        </span>
      </Col>

      <Col span={1} xl={1}>
        <span className="actionIcon" title="Share selected contacts">
          <Icon type="share-alt" />
        </span>
      </Col>

      <Col span={1} xl={1}>
        <span className="actionIcon" title="Archive selected contacts">
          <Icon type="hdd" />
        </span>
      </Col>

      <Col
        span={1}
        offset={13}
        xl={{ span: 1, offset: 12 }}
        xxl={{ span: 1, offset: 13 }}
      >
        <span className="actionIcon" title="Filter Contacts">
          <Icon type="filter" />
        </span>
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
