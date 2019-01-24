import { getRoles } from '@codetanzania/emis-api-states';
import { Checkbox, Col, Icon, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Render action bar for actions which are applicable to list content
 *
 * @function
 * @name RolesListHeader
 *
 * @param {Object} props
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const RolesListHeader = ({ total }) => (
  <div className="RoleListHeader">
    <Row>
      <Col span={1} xl={1} style={{ paddingLeft: 8 }}>
        <Checkbox />
      </Col>
      <Col span={1} xl={1}>
        <span className="actionIcon">
          <Icon
            type="reload"
            title="Refresh Roles"
            onClick={() => getRoles()}
          />
        </span>
      </Col>
      <Col
        span={1}
        offset={17}
        xl={{ span: 1, offset: 16 }}
        xxl={{ span: 1, offset: 17 }}
      >
        <Icon type="filter" title="Filter Role" />
      </Col>
      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={2}
          total={total}
          onChange={page => getRoles({ page })}
        />
      </Col>
    </Row>
  </div>
);

export default RolesListHeader;

RolesListHeader.propTypes = {
  total: PropTypes.number,
};

RolesListHeader.defaultProps = {
  total: 0,
};
