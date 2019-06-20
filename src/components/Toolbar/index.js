import { Button, Col, Pagination, Row } from 'antd';
import { pluralize, singularize } from 'inflection';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name Toolbar
 * @description Render action bar for actions which are applicable to list
 * content
 *
 * @param {object} props props object
 * @param {string} props.itemName names for items/ modules used by toolbar
 * @param {number} props.page current page
 * @param {number} props.total total number of results from the API
 * @param {number} props.selectedItemsCount total Number of selected items
 * @param {string} props.exportUrl export url
 * @param {Function} props.onArchive on archive action callback
 * @param {Function} props.onFilter on filter action callback
 * @param {Function} props.onNotify on notify action callback
 * @param {Function} props.onPaginate on paginate action callback
 * @param {Function} props.onRefresh on refresh action callback
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
  exportUrl,
  onArchive,
  onFilter,
  onNotify,
  onPaginate,
  onRefresh,
  onShare,
}) => (
  <div className="Toolbar">
    <Row>
      {/* action bar */}
      <Col xxl={12} xl={12} lg={12} md={10} sm={14} xs={12}>
        <Row>
          {/* refresh  action */}
          {onRefresh && (
            <Col xxl={2} xl={2} lg={3} md={4} sm={6} xs={6}>
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
            <Col xxl={2} xl={2} lg={3} md={4} sm={6} xs={6}>
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
          {exportUrl && (
            <Col xxl={2} xl={2} lg={3} md={4} sm={6} xs={6}>
              <a href={exportUrl} download>
                <Button
                  type="circle"
                  icon="cloud-download"
                  title="Export selected "
                  className="actionButton"
                  size="large"
                />
              </a>
            </Col>
          )}
          {/* end export action */}

          {/* bulk share action */}
          {selectedItemsCount > 0 && onShare && (
            <Col xxl={2} xl={2} lg={3} md={4} sm={6} xs={6}>
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
            <Col xxl={1} xl={1} lg={1} md={4} sm={6} xs={6}>
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
      <Col xxl={12} xl={12} lg={12} md={14} sm={10} xs={12}>
        <Row type="flex" justify="end">
          {/* selected and  number summary */}
          <Col xxl={10} xl={12} lg={13} md={12} sm={0} xs={0}>
            {selectedItemsCount > 0 && (
              <span
                style={{ color: '#959595' }}
              >{`selected ${selectedItemsCount} out of `}</span>
            )}
            <span
              style={{ color: '#959595', fontSize: 15, fontWeight: 600 }}
            >{`${total} ${
              total > 1 ? pluralize(itemName) : singularize(itemName)
            }`}</span>
          </Col>
          {/* end selected and  number summary */}

          {/* filter action */}
          {onFilter && (
            <Col xxl={2} xl={2} lg={2} md={3} sm={0} xs={0}>
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
          {onPaginate && total > 0 && (
            <Col xxl={6} xl={7} lg={9} md={9} sm={24} xs={24}>
              <Pagination
                simple
                current={page}
                defaultCurrent={page}
                total={total}
                className="pagination"
                onChange={onPaginate}
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
  exportUrl: PropTypes.string,
  selectedItemsCount: PropTypes.number.isRequired,
  onArchive: PropTypes.func,
  onFilter: PropTypes.func,
  onNotify: PropTypes.func,
  onPaginate: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onShare: PropTypes.func,
};

Toolbar.defaultProps = {
  exportUrl: undefined,
  onFilter: null,
  onShare: null,
  onNotify: null,
  onArchive: null,
};

export default Toolbar;
