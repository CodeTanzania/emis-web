import { paginateItems, refreshItems } from '@codetanzania/emis-api-states';
import { Button, Col, Pagination, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name ItemsActionBar
 * @description Render action bar for actions which are
 *  applicable to list content
 *
 * @param {Object} props props object
 * @param {number} props.page current page
 * @param {number} props.total total number of items
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ItemsActionBar = ({ page, total, onFilter }) => (
  <div className="ItemsActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh items"
          onClick={() =>
            refreshItems(
              () => {
                notifySuccess('Items refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing items, please contact system administrator!'
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
          title="Archive selected items"
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
          title="Filter items"
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
          onChange={nextPage => paginateItems(nextPage)}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
ItemsActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default ItemsActionBar;
