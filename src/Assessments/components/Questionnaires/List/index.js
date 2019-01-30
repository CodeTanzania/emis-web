import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import QuestionnairesListHeader from '../ListHeader';
import QuestionnairesListItem from '../ListItem';

const QuestionnairesList = ({ questionnaires, loading, onEdit }) => (
  <Fragment>
    <QuestionnairesListHeader />
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
          onEdit={() => onEdit(questionnaire)}
        />
      )}
    />
  </Fragment>
);

QuestionnairesList.propTypes = {
  loading: PropTypes.bool.isRequired,
  questionnaires: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default QuestionnairesList;
