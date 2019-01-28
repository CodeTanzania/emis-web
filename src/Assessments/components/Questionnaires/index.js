import { Connect, getQuestionnaires } from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import QuestionnairesActionBar from './ActionBar';
import QuestionnairesList from './List';
import './styles.css';

const { Search } = Input;

/**
 * Render questionnaire list which have search box, actions and questionnaire list
 *
 * @class
 * @name Questionnaires
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Questionnaires extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    questionnaires: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string })
    ).isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getQuestionnaires();
  }

  render() {
    const { questionnaires, loading, page, total } = this.props;
    return (
      <div className="Questionnaires">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for questionnaires here ..."
              onChange={({ target: { value } }) =>
                getQuestionnaires({ q: { value } })
              }
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Questionnaire"
            >
              New Questionnaire
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <QuestionnairesActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
        <QuestionnairesList questionnaires={questionnaires} loading={loading} />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(Questionnaires, {
  questionnaires: 'questionnaires.list',
  loading: 'questionnaires.loading',
  page: 'questionnaires.page',
  total: 'questionnaires.total',
});
