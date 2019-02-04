import { paginateStocks, refreshStocks } from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

/**
 * Render action bar for actions which are applicable to list content
 *
 * @function
 * @name StocksActionBar
 *
 * @param {Object} props
 * @param {page} props.page
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const StocksActionBar = ({ page, total }) => (
  <div className="StocksActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh stocks"
          onClick={() =>
            refreshStocks(
              () => {
                notifySuccess('Stocks refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Stocks, please Stocks system administrator!'
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
          icon="cloud-download"
          title="Export selected stocks"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="share-alt"
          title="Share selected stocks"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="hdd"
          title="Archive selected stocks"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col
        span={1}
        offset={13}
        xl={{ span: 1, offset: 14 }}
        xxl={{ span: 1, offset: 15 }}
      />

      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={page}
          total={total}
          onChange={nextPage => paginateStocks(nextPage)}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
StocksActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default StocksActionBar;
