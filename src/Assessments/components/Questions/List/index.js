import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import QuestionsListHeader from '../ListHeader';
import QuestionsListItem from '../ListItem';

/**
 * question list item component. Render question details
 *
 * @function
 * @name QuestionsList
 *
 * @param {Object} props
 * @param {string} props.loading
 * @param {string} props.onEdit
 * @param {string} props.questions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const QuestionsList = ({ questions, loading, onEdit }) => (
  <Fragment>
    <QuestionsListHeader />
    <List
      loading={loading}
      dataSource={questions}
      renderItem={question => (
        <QuestionsListItem
          key={question.name}
          label={question.label}
          phase={question.phase}
          assess={question.assess}
          stage={question.stage}
          color={question.indicator.color}
          onEdit={() => onEdit(question)}
        />
      )}
    />
  </Fragment>
);

QuestionsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default QuestionsList;
