import { paginatePlans, refreshPlans } from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name PlansActionBar
 * @description Render action bar for actions which are applicable to list content
 *
 * @param {object} props props object
 * @param {number} props.page current page number
 * @param {number} props.total total number of plans from the API
 * @param {number} props.selectedItemCount total nunmber of selected plans
 * @param {boolean} props.isGridLayout flag to indicate if the view is grid or list
 * @param {Function} props.onNotify callback for notify action
 * @param {Function} props.onToggleLayout callback for toggling grid and list
 * layout
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const PlansActionBar = ({
  page,
  total,
  selectedItemCount,
  isGridLayout,
  onNotify,
  onToggleLayout,
}) => (
  <div className="PlansActionBar">
    <Row>
      {/* bulk select action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }} className="checkbox">
        <Checkbox />
      </Col>
      {/* end bulk select action */}

      {/* refresh plans action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh plans"
          onClick={() =>
            refreshPlans(
              () => {
                notifySuccess('Plans refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing plans, please plan system administrator!'
                );
              }
            )
          }
          className="actionButton"
          size="large"
        />
      </Col>
      {/* end refresh plans action */}

      {/* notify action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }}>
        <Button
          type="circle"
          icon="sound"
          title={`Disseminate plan to${
            selectedItemCount > 0 ? ' selected' : ''
          } activity`}
          className="actionButton"
          size="large"
          onClick={onNotify}
        />
      </Col>
      {/* end notify action  */}

      {/* export action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        {selectedItemCount > 0 && (
          <Button
            type="circle"
            icon="cloud-download"
            title="Export selected plans"
            className="actionButton"
            size="large"
          />
        )}
      </Col>
      {/* end export action */}

      {/* bulk share action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        {selectedItemCount > 0 && (
          <Button
            type="circle"
            icon="share-alt"
            title="Share selected plans"
            className="actionButton"
            size="large"
          />
        )}
      </Col>
      {/* end bulk share action */}

      {/* bulk archive action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        {selectedItemCount > 0 && (
          <Button
            type="circle"
            icon="hdd"
            title="Archive selected plans"
            className="actionButton"
            size="large"
          />
        )}
      </Col>
      {/* end bulk archive action */}

      {/* selected and plans number summary */}
      <Col span={5} xl={{ span: 4, offset: 8 }} xxl={{ span: 5, offset: 8 }}>
        {selectedItemCount > 0 && (
          <span
            style={{ color: '#c5c5c5' }}
          >{`${selectedItemCount} out of `}</span>
        )}
        <span style={{ color: '#c5c5c5' }}>{`${total} plans`}</span>
      </Col>
      {/* end selected and plans number summary */}

      {/* filter action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        {/* <Button
          type="circle"
          icon="filter"
          title="Filter plans"
          className="actionButton"
          size="large"
          onClick={onFilter}
        /> */}
      </Col>
      {/* end filter action */}

      {/* switch list layout action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        <Button
          type="circle"
          icon={isGridLayout ? 'bars' : 'appstore'}
          title="Switch plans layout to grid"
          className="actionButton"
          size="large"
          onClick={onToggleLayout}
        />
      </Col>
      {/* end switch list layout action */}

      {/* pagination */}
      <Col span={1} xl={{ span: 4 }} xxl={{ span: 3 }}>
        <Pagination
          simple
          defaultCurrent={page}
          current={page}
          total={total}
          onChange={nextPage => paginatePlans(nextPage)}
          className="pagination"
        />
      </Col>
      {/* end pagination */}
    </Row>
  </div>
);

/* props validation */
PlansActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isGridLayout: PropTypes.bool.isRequired,
  selectedItemCount: PropTypes.number.isRequired,
  onNotify: PropTypes.func.isRequired,
  onToggleLayout: PropTypes.func.isRequired,
};

export default PlansActionBar;
