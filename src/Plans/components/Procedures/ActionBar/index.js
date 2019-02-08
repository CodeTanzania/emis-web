import {
  paginateProcedures,
  refreshProcedures,
} from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

/**
 * Render action bar for actions which are applicable to list content
 *
 * @function
 * @name ProceduresActionBar
 *
 * @param {Object} props
 * @param {page} props.page
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ProceduresActionBar = ({
  page,
  total,
  selectedItemCount,
  // onFilter,
  onNotify,
}) => (
  <div className="ProceduresActionBar">
    <Row>
      {/* bulk select action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }} className="checkbox">
        <Checkbox />
      </Col>
      {/* end bulk select action */}

      {/* refresh procedures action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh procedures"
          onClick={() =>
            refreshProcedures(
              () => {
                notifySuccess('Procedures refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing procedures, please procedure system administrator!'
                );
              }
            )
          }
          className="actionButton"
          size="large"
        />
      </Col>
      {/* end refresh procedures action */}

      {/* notify action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }}>
        <Button
          type="circle"
          icon="mail"
          title={`Send Notification to${
            selectedItemCount > 0 ? ' selected' : ''
          } procedures`}
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
            title="Export selected procedures"
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
            title="Share selected procedures"
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
            title="Archive selected procedures"
            className="actionButton"
            size="large"
          />
        )}
      </Col>
      {/* end bulk archive action */}

      {/* selected and procedures number summary */}
      <Col span={6} xl={{ span: 4, offset: 9 }} xxl={{ span: 5, offset: 9 }}>
        {selectedItemCount > 0 && (
          <span
            style={{ color: '#c5c5c5' }}
          >{`${selectedItemCount} out of `}</span>
        )}
        <span style={{ color: '#c5c5c5' }}>{`${total} procedures`}</span>
      </Col>
      {/* end selected and procedures number summary */}

      {/* filter action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        {/* <Button
          type="circle"
          icon="filter"
          title="Filter procedures"
          className="actionButton"
          size="large"
          onClick={onFilter}
        /> */}
      </Col>
      {/* end filter action */}

      {/* pagination */}
      <Col span={1} xl={{ span: 4 }} xxl={{ span: 3 }}>
        <Pagination
          simple
          defaultCurrent={page}
          total={total}
          onChange={nextPage => paginateProcedures(nextPage)}
          className="pagination"
        />
      </Col>
      {/* end pagination */}
    </Row>
  </div>
);

/* props validation */
ProceduresActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  selectedItemCount: PropTypes.number.isRequired,
  // onFilter: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired,
};

export default ProceduresActionBar;
