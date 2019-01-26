import { Connect, getQuestionnaires } from '@codetanzania/emis-api-states';
import { Button, Col, Input, List, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import QuestionnairesActionBar from './ActionBar';
import QuestionnairesListItem from './ListItem';
import './styles.css';

const { Search } = Input;

/**
 * Render questionnaire list which have search box, actions and questionnaire list
 *
 * @class
 * @name QuestionnairesList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class QuestionnairesList extends Component {
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
      <div className="QuestionnairesList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for questionnaires here ..."
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Questionnaires"
            >
              New Questionnaires
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <QuestionnairesActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
        <List
          loading={loading}
          dataSource={questionnaires}
          renderItem={questionnaire => (
            <QuestionnairesListItem
              key={questionnaire.title}
              title={questionnaire.title}
              phase={questionnaire.phase}
              assess={questionnaire.assess}
              stage={questionnaire.stage}
            />
          )}
        />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(QuestionnairesList, {
  questionnaires: 'questionnaires.list',
  loading: 'questionnaires.loading',
  page: 'questionnaires.page',
  total: 'questionnaires.total',
});
