import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import { getFeatures } from '@codetanzania/emis-api-states';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

/**
 * Render action bar for actions which are applicable to list content
 *
 * @function
 * @name SubwardsActionBar
 *
 * @param {Object} props
 * @param {page} props.page
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const SubwardsActionBar = ({ page, total }) => (
  <div className="SubwardsActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh Subwards"
          className="actionButton"
          size="large"
          onClick={() => getFeatures()}
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="cloud-download"
          title="Export selected Subwards"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="share-alt"
          title="Share selected Subwards"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="hdd"
          title="Archive selected Subwards"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col
        span={1}
        offset={15}
        xl={{ span: 1, offset: 14 }}
        xxl={{ span: 1, offset: 15 }}
      >
        <Button
          type="circle"
          icon="filter"
          title="Filter Subwards"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={page}
          total={total}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
SubwardsActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  //   onFilter: PropTypes.func.isRequired,
};

export default SubwardsActionBar;
