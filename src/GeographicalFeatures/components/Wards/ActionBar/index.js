import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import {
  refreshFeatures,
  paginateFeatures,
} from '@codetanzania/emis-api-states';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

/**
 * Render action bar for actions which are applicable to list content
 *
 * @function
 * @name WardsActionBar
 *
 * @param {Object} props
 * @param {page} props.page
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const WardsActionBar = ({ page, total, onFilter }) => (
  <div className="WardsActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh Wards"
          className="actionButton"
          size="large"
          onClick={() =>
            refreshFeatures(
              () => {
                notifySuccess('Ward refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing ward, please contact system administrator!'
                );
              }
            )
          }
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="cloud-download"
          title="Export selected Wards"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="hdd"
          title="Archive selected Wards"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col
        span={1}
        offset={16}
        xl={{ span: 1, offset: 15 }}
        xxl={{ span: 1, offset: 16 }}
      >
        <Button
          type="circle"
          icon="filter"
          title="Filter Wards"
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
          className="pagination"
          onChange={nextPage => paginateFeatures(nextPage)}
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
WardsActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default WardsActionBar;
