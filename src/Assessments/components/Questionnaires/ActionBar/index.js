import { getQuestions } from '@codetanzania/emis-api-states';
import { Button, Checkbox, Col, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.css';

/**
 * Render action bar for actions which are applicable to list content
 *
 * @function
 * @name QuestionnairesActionBar
 *
 * @param {Object} props
 * @param {page} props.page
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const QuestionnairesActionBar = ({ page, total }) => (
  <div className="QuestionnairesActionBar">
    <Row>
      <Col span={1} xl={1} className="checkbox">
        <Checkbox />
      </Col>

      <Col span={1} xl={1}>
        <Button
          shape="circle"
          icon="reload"
          title="Refresh Questionnaires"
          onClick={() => getQuestions()}
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="cloud-download"
          title="Export selected Questionnaires"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="share-alt"
          title="Share selected Questionnaires"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={1} xl={1}>
        <Button
          type="circle"
          icon="hdd"
          title="Archive selected Questionnaires"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col
        span={1}
        offset={15}
        xl={{ span: 1, offset: 14 }}
        xxl={{ span: 1, offset: 15 }}
      >
        <Button
          type="circle"
          icon="filter"
          title="Filter questionnaires"
          className="actionButton"
          size="large"
        />
      </Col>

      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={page}
          total={total}
          onChange={nextPage => getQuestions({ page: nextPage })}
          className="pagination"
        />
      </Col>
    </Row>
  </div>
);

/* props validation */
QuestionnairesActionBar.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default QuestionnairesActionBar;
