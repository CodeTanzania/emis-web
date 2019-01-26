import { Connect, getQuestions } from '@codetanzania/emis-api-states';
import { Button, Col, Input, List, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import QuestionsListItem from '../Questions/ListItem';
import QuestionsActionBar from '../Questions/ActionBar';
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
    questions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getQuestions();
  }

  render() {
    const { questions, loading, page, total } = this.props;
    return (
      <div className="QuestionnairesList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for questions here ..."
              onChange={({ target: { value } }) =>
                getQuestions({ q: { value } })
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
              title="Add New Question"
            >
              New Question
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <QuestionsActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
        <List
          loading={loading}
          dataSource={questions}
          renderItem={question => (
            <QuestionsListItem
              key={question.abbreviation}
              abbreviation={question.abbreviation}
              label={question.label}
              phase={question.phase}
              assess={question.assess}
              stage={question.stage}
            />
          )}
        />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(QuestionnairesList, {
  questions: 'questions.list',
  loading: 'questions.loading',
  page: 'questions.page',
  total: 'questions.total',
});
