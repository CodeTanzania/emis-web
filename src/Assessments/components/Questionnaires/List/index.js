import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import QuestionnairesListHeader from '../ListHeader';
import QuestionnairesListItem from '../ListItem';

/**
 * Questionaire list item component. Render questionnaire details
 *
 * @function
 * @name QuestionnairesList
 *
 * @param {Object} props
 * @param {string} props.questionnaires
 * @param {string} props.loading
 * @param {string} props.onEdit
 *
 * @version 0.1.0
 * @since 0.1.0
 */
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
