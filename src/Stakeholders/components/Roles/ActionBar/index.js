import { refreshRoles, paginateRoles } from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name RolesActionBar
 * @description Render action bar for actions which are applicable to list content
 *
 * @param {Object} props props object
 * @param {number} props.page current page number
 * @param {number} props.total total number of roles
 * @param {Function} props.onFilter callback to be invoked on filter action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const RolesActionBar = ({ page, total, onFilter }) => (
  <div className="RolesActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh roles"
          onClick={() =>
            refreshRoles(
              () => {
                notifySuccess('Roles refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Roles, please Roles system administrator!'
                );
              }
            )
          }
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="hdd"
          title="Archive selected roles"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col
        span={1}
        offset={17}
        xl={{ span: 1, offset: 16 }}
        xxl={{ span: 1, offset: 17 }}
      >
        <Button
          type="circle"
          icon="filter"
          title="Filter roles"
          className="actionButton"
          size="large"
          onClick={onFilter}
        />
      </Col>

      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={page}
          total={total}
          onChange={nextPage => paginateRoles(nextPage)}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
RolesActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default RolesActionBar;
