import { refreshAlerts, paginateAlerts } from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';
import { notifyError, notifySuccess } from '../../../../util';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name AlertsActionBar
 * @description  Render action bar for actions which are applicable
 * to list content
 *
 * @param {Object} props props object
 * @param {number} props.page current page
 * @param {number} props.total total number of alerts
 * @param {Function} props.onFilter function to filter alerts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AlertsActionBar = ({ page, total, onFilter }) => (
  <div className="AlertsActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh Alerts"
          onClick={() =>
            refreshAlerts(
              () => {
                notifySuccess('Alerts refreshed successfully');
              },
              () => {
                notifyError(
                  `An Error occurred while refreshing alerts, please alerts 
                  system administrator!`
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
          icon="mail"
          title="Send Alerts"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="cloud-download"
          title="Export selected Alerts"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col
        span={1}
        offset={13}
        xl={{ span: 1, offset: 14 }}
        xxl={{ span: 1, offset: 16 }}
      >
        <Button
          type="circle"
          icon="filter"
          title="Filter Alerts"
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
          onChange={nextPage => paginateAlerts(nextPage)}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
AlertsActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default AlertsActionBar;
