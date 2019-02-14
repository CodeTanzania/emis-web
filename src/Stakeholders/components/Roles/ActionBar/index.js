import { refreshRoles, paginateRoles } from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name RolesActionBar
 * @description Render action bar for actions which are applicable to list content
 *
 * @param {Object} props props object
 * @param {number} props.page current page number
 * @param {number} props.total total number of roles
 * @param {number} props.selectedItemCount total Number of selected items
 * @param {Function} props.onFilter callback to be invoked on filter action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const RolesActionBar = ({
  page,
  total,
  selectedItemCount,
  // onFilter,
}) => (
  <div className="RolesActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh roles"
          onClick={() =>
            refreshRoles(
              () => {
                notifySuccess('Roles refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Roles, please Roles system administrator!'
                );
              }
            )
          }
          className="actionButton"
          size="large"
        />
      </Col>

      {/* notify action */}
      <Col xl={{ span: 1 }} xxl={{ span: 1 }}>
        {selectedItemCount > 0 && (
          <Button
            type="circle"
            icon="mail"
            title="Send Notification"
            className="actionButton"
            size="large"
          />
        )}
      </Col>
      {/* end notify action  */}

      {/* export action */}
      <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
        {selectedItemCount > 0 && (
          <Button
            type="circle"
            icon="cloud-download"
            title="Export selected roles"
            className="actionButton"
            size="large"
          />
        )}
      </Col>
      {/* end export action */}

      {/* selected and role number summary */}
      <Col span={6} xl={{ span: 4, offset: 12 }} xxl={{ span: 5, offset: 12 }}>
        {selectedItemCount > 0 && (
          <span
            style={{ color: '#c5c5c5' }}
          >{`${selectedItemCount} out of `}</span>
        )}
        <span style={{ color: '#c5c5c5' }}>{`${total} roles`}</span>
      </Col>
      {/* end selected and role number summary */}

      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={page}
          total={total}
          onChange={nextPage => paginateRoles(nextPage)}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
RolesActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  selectedItemCount: PropTypes.number.isRequired,
  // onFilter: PropTypes.func.isRequired,
};

export default RolesActionBar;
