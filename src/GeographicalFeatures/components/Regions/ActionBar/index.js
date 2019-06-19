import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import {
  paginateFeatures,
  refreshFeatures,
} from '@codetanzania/emis-api-states';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name RegionsActionBar
 * @description Render action bar for actions which are applicable to list
 * content
 *
 * @param {object} props props object
 * @param {number} props.page current page
 * @param {number} props.total total number of regions
 * @param {Function} props.onFilter function for filtering regions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const RegionsActionBar = ({ page, total, onFilter }) => (
  <div className="RegionsActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh Regions"
          className="actionButton"
          size="large"
          onClick={() =>
            refreshFeatures(
              () => {
                notifySuccess('Regions refreshed successfully');
              },
              () => {
                notifyError(
                  `An Error occurred while refreshing regions, please contact 
                  system administrator!`
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
          title="Export selected Regions"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="hdd"
          title="Archive selected Regions"
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
          title="Filter Regions"
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
RegionsActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default RegionsActionBar;
