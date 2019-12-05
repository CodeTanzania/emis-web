import { List } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import QuestionnairesListHeader from '../ListHeader';
import QuestionnairesListItem from '../ListItem';

/**
 * @function
 * @name IndicatorsList
 * @description Questionnaire list item component. Render questionnaire details
 *
 * @param {object} props props object
 * @param {boolean} props.loading preload list of questionnaire
 * @param {Array} props.questionnaire array list of questionnaire
 * @param {Function} props.onEdit function for editing single questionnaire
 * @returns {object} React component
 * @version 0.1.0
 * @since 0.1.0
 */
const QuestionnairesList = ({ questionnaires, loading, onEdit }) => (
  <>
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
  </>
);

QuestionnairesList.propTypes = {
  loading: PropTypes.bool.isRequired,
  questionnaires: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default QuestionnairesList;
