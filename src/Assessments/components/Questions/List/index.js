import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import QuestionsListHeader from '../ListHeader';
import QuestionsListItem from '../ListItem';

const QuestionsList = ({ questions, loading }) => (
  <Fragment>
    <QuestionsListHeader />
    <List
      loading={loading}
      dataSource={questions}
      renderItem={question => (
        <QuestionsListItem
          key={question.indicator}
          color={question.indicator.color}
          label={question.label}
          phase={question.phase}
          assess={question.assess}
          stage={question.stage}
        />
      )}
    />
  </Fragment>
);

QuestionsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default QuestionsList;
