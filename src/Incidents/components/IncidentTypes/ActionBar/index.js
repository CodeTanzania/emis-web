import {
  paginateIncidentTypes,
  refreshIncidentTypes,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

/**
 * @function
 * @name IncidentTypesActionBar
 * @description  Render action bar for actions which are applicable to list
 * content
 *
 * @param {object} props props object
 * @param {number} props.page current page
 * @param {number} props.total total number of incident types
 * @param {Function} props.onFilter function to filters incident types
 *
 * @returns {object} React Component
 * @version 0.1.0
 * @since 0.1.0
 */
const IncidentTypesActionBar = ({ page, total, onFilter }) => (
  <div className="IncidentTypesActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh Incident Types"
          onClick={() =>
            refreshIncidentTypes(
              () => {
                notifySuccess('Incident Types refreshed successfully');
              },
              () => {
                notifyError(
                  `An Error occurred while refreshing incident types,
                   please contact system administrator!`
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
          title="Export selected Incident Types"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="hdd"
          title="Archive selected Incident Types"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col
        span={1}
        offset={16}
        xl={{ span: 1, offset: 16 }}
        xxl={{ span: 1, offset: 16 }}
      >
        <Button
          type="circle"
          icon="filter"
          title="Filter Incident Types"
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
          onChange={nextPage => paginateIncidentTypes(nextPage)}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
IncidentTypesActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default IncidentTypesActionBar;
