import { getFeatures } from '@codetanzania/emis-api-states';
import { Button, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 *
 * @function
 * @name AdminstrativeBoundariesActionBar
 * @description Render action bar for actions which are applicable to
 * list content
 *
 * @param {Object} props props object
 * @param {number} props.page current page
 * @param {number} props.total total number of AdminstrativeBoundaries
 * @param {Function} props.onFilter filters AdminstrativeBoundaries
 *  when function is called
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AdminstrativeBoundariesActionBar = ({ page, total, onFilter }) => (
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
          title="Filter adminstrative boundaries"
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
  onFilter: PropTypes.func.isRequired,
};

export default AdminstrativeBoundariesActionBar;
