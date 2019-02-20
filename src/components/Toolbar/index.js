import { Button, Col, Pagination, Row } from 'antd';
import { singularize, pluralize } from 'inflection';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name Toolbar
 * @description Render action bar for actions which are applicable to list content
 *
 * @param {Object} props props object
 * @param {string} props.itemName names for items/ modules used by toolbar
 * @param {number} props.page current page
 * @param {number} props.total total number of results from the API
 * @param {number} props.selectedItemsCount total Number of selected items
 * @param {Function} props.onNotify on notify action callback
 * @param {Function} props.onFilter on filter action callback
 * @param {Function} props.onShare on share action callback
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const Toolbar = ({
  itemName,
  page,
  total,
  selectedItemsCount,
  onArchive,
  onExport,
  onFilter,
  onNotify,
  onPaginate,
  onRefresh,
  onShare,
}) => (
  <div className="Toolbar">
    <Row>
      {/* action bar */}
      <Col span={12}>
        <Row>
          {/* refresh  action */}
          {onRefresh && (
            <Col span={1} xl={{ span: 2 }} xxl={{ span: 2 }}>
              <Button
                shape="circle"
                icon="reload"
                title="Refresh "
                className="actionButton"
                size="large"
                onClick={onRefresh}
              />
            </Col>
          )}
          {/* end refresh  action */}

          {/* notify action */}
          {onNotify && (
            <Col span={1} xl={{ span: 2 }} xxl={{ span: 2 }}>
              <Button
                type="circle"
                icon="mail"
                title={`Send Notification to${
                  selectedItemsCount > 0 ? 'selected' : ''
                } `}
                className="actionButton"
                size="large"
                onClick={onNotify}
              />
            </Col>
          )}
          {/* end notify action  */}

          {/* export action */}
          {selectedItemsCount > 0 && onExport && (
            <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
              <Button
                type="circle"
                icon="cloud-download"
                title="Export selected "
                className="actionButton"
                size="large"
                onClick={onExport}
              />
            </Col>
          )}
          {/* end export action */}

          {/* bulk share action */}
          {selectedItemsCount > 0 && onShare && (
            <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
              <Button
                type="circle"
                icon="share-alt"
                title="Share selected "
                className="actionButton"
                size="large"
                onClick={onShare}
              />
            </Col>
          )}
          {/* end bulk share action */}

          {/* bulk archive action */}
          {selectedItemsCount > 0 && onArchive && (
            <Col span={1} xl={{ span: 1 }} xxl={{ span: 1 }}>
              <Button
                type="circle"
                icon="hdd"
                title="Archive selected "
                className="actionButton"
                size="large"
                onClick={onArchive}
              />
            </Col>
          )}
          {/* end bulk archive action */}
        </Row>
      </Col>
      {/* end action bar */}

      {/* filter bar */}
      <Col span={12}>
        <Row type="flex" justify="end">
          {/* selected and  number summary */}
          <Col span={13}>
            {selectedItemsCount > 0 && (
              <span
                style={{ color: '#959595' }}
              >{`selected ${selectedItemsCount} out of `}</span>
            )}
            <span
              style={{ color: '#959595', fontSize: 15, fontWeight: 600 }}
            >{`${total} ${
              selectedItemsCount > 1
                ? pluralize(itemName)
                : singularize(itemName)
            }`}</span>
          </Col>
          {/* end selected and  number summary */}

          {/* filter action */}
          {onFilter && (
            <Col span={4} xl={{ span: 3 }} xxl={{ span: 2 }}>
              <Button
                type="circle"
                icon="filter"
                title="Filter"
                className="actionButton"
                size="large"
                onClick={onFilter}
              />
            </Col>
          )}
          {/* end filter action */}

          {/* pagination */}
          {onPaginate && (
            <Col span={4} xl={{ span: 4 }} xxl={{ span: 5 }}>
              <Pagination
                simple
                current={page}
                defaultCurrent={page}
                total={total}
                className="pagination"
                onClick={onPaginate}
              />
            </Col>
          )}
          {/* end pagination */}
        </Row>
      </Col>
      {/* end filter bar */}
    </Row>
  </div>
);

/* props validation */
Toolbar.propTypes = {
  itemName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  selectedItemsCount: PropTypes.number.isRequired,
  onArchive: PropTypes.func,
  onExport: PropTypes.func,
  onFilter: PropTypes.func.isRequired,
  onNotify: PropTypes.func,
  onPaginate: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onShare: PropTypes.func,
};

Toolbar.defaultProps = {
  onExport: null,
  onShare: null,
  onNotify: null,
  onArchive: null,
};

export default Toolbar;
