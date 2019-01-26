import { getFeatures } from '@codetanzania/emis-api-states';
import { Button, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

/**
 * Render action bar for actions which are applicable to list content
 *
 * @function
 * @name AdminstrativeBoundariesActionBar
 *
 * @param {Object} props
 * @param {page} props.page
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AdminstrativeBoundariesActionBar = ({ page, total }) => (
  <div className="AdminstrativeBoundariesActionBar">
    <Row>
      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh adminstrative boundaries"
          onClick={() => getFeatures()}
          className="actionButton"
          size="large"
        />
      </Col>

      <Col
        span={1}
        offset={17}
        xl={{ span: 1, offset: 18 }}
        xxl={{ span: 1, offset: 19 }}
      >
        <Button
          type="circle"
          icon="filter"
          title="Filter adminstrative boudaries"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={page}
          total={total}
          onChange={nextPage => getFeatures({ page: nextPage })}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
AdminstrativeBoundariesActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default AdminstrativeBoundariesActionBar;
