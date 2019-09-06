import { getWarehouses } from '@codetanzania/emis-api-states';
import { Button, Col, Pagination, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

/**
 * @function
 * @name WarehousesActionBar
 * @description Render action bar for actions which are applicable
 *  to list content
 *
 * @param {object} props props object
 * @param {number} props.page current page
 * @param {number} props.total total number of warehouses
 *
 * @returns {object} React Component
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const WarehousesActionBar = ({ page, total, onFilter }) => (
  <div className="WarehousesActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh warehouse"
          onClick={() => getWarehouses()}
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="hdd"
          title="Archive selected warehouse"
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
          title="Filter warehouse"
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
          onChange={nextPage => getWarehouses({ page: nextPage })}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
WarehousesActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default WarehousesActionBar;
