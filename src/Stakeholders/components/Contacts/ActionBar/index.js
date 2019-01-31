import {
  paginateStakeholders,
  refreshStakeholders,
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
 * @name ContactsActionBar
 *
 * @param {Object} props
 * @param {page} props.page
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ContactsActionBar = ({
  page,
  total,
  selectedCount,
  onFilter,
  onNotify,
}) => (
  <div className="ContactsActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh contacts"
          onClick={() =>
            refreshStakeholders(
              () => {
                notifySuccess('Contacts refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing contacts, please contact system administrator!'
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
          title={`Send Notification to${
            selectedCount > 0 ? ' selected' : ''
          } contacts`}
          className="actionButton"
          size="large"
          onClick={onNotify}
        />
      </Col>

      <Col span={1} xl={1}>
        {selectedCount > 0 && (
          <Button
            type="circle"
            icon="cloud-download"
            title="Export selected contacts"
            className="actionButton"
            size="large"
          />
        )}
      </Col>

      <Col span={1} xl={1}>
        {selectedCount > 0 && (
          <Button
            type="circle"
            icon="share-alt"
            title="Share selected contacts"
            className="actionButton"
            size="large"
          />
        )}
      </Col>

      <Col span={1} xl={1}>
        {selectedCount > 0 && (
          <Button
            type="circle"
            icon="hdd"
            title="Archive selected contacts"
            className="actionButton"
            size="large"
          />
        )}
      </Col>

      <Col
        span={3}
        offset={7}
        xl={{ span: 3, offset: 7 }}
        xxl={{ span: 3, offset: 7 }}
      >
        {selectedCount > 0 && <h4>{`${selectedCount} Contact(s) Selected`}</h4>}
      </Col>
      <Col
        span={1}
        offset={4}
        xl={{ span: 1, offset: 3 }}
        xxl={{ span: 1, offset: 4 }}
      >
        <Button
          type="circle"
          icon="filter"
          title="Filter contacts"
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
          onChange={nextPage => paginateStakeholders(nextPage)}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
ContactsActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  selectedCount: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired,
};

export default ContactsActionBar;
