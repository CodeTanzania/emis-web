import {
  Connect,
  getQuestions,
  searchQuestions,
  openQuestionForm,
  closeQuestionForm,
  selectQuestion,
  getIndicators,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import QuestionsActionBar from './ActionBar';
import QuestionsList from './List';
import QuestionFilters from './Filters';
import QuestionForm from './Form';
import './styles.css';

const { Search } = Input;

/**
 * Render question list which have search box, actions and question list
 *
 * @class
 * @name Questions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Questions extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    indicators: PropTypes.arrayOf(
      PropTypes.shape({ subject: PropTypes.string })
    ).isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    posting: PropTypes.bool.isRequired,
    question: PropTypes.shape({ name: PropTypes.string }),
    questionSchema: PropTypes.shape({
      properties: PropTypes.shape({
        stage: PropTypes.shape({ type: PropTypes.string }).isRequired,
      }),
    }).isRequired,
    showForm: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    question: null,
  };

  componentDidMount() {
    getQuestions();
    getIndicators();
  }

  /**
   * open filters modal by setting it's visible property to false via state
   *
   * @function
   * @name openFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * Close filters modal by setting it's visible property to false via state
   *
   * @function
   * @name closeFiltersModal
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * Open question form
   *
   * @function
   * @name openForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openQuestionForm();
  };

  /**
   * close question form
   *
   * @function closeForm
   * @name
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeForm = () => {
    closeQuestionForm();
    this.setState({ isEditForm: false });
  };

  /**
   * Handle on Edit action for list item
   *
   * @function
   * @name handleEdit
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = question => {
    selectQuestion(question);
    this.setState({ isEditForm: true });
    openQuestionForm();
  };

  render() {
    const {
      questions,
      loading,
      page,
      total,
      question,
      posting,
      showForm,
      questionSchema,
      indicators,
    } = this.props;
    const { showFilters, isEditForm } = this.state;

    return (
      <div className="Questions">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for questions here ..."
              onChange={({ target: { value } }) =>
                searchQuestions({ q: value })
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
              onClick={this.openForm}
            >
              New Question
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <QuestionsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}
        {/* list starts */}
        <QuestionsList
          questions={questions}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}
        <Modal
          title="Filter Questions"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          question={question}
        >
          <QuestionFilters onCancel={this.closeFiltersModal} />
        </Modal>

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Question' : 'Add New Question'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
        >
          <QuestionForm
            posting={posting}
            isEditForm={isEditForm}
            question={question}
            onCancel={this.closeForm}
            questionSchema={questionSchema}
            indicators={indicators}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Questions, {
  questions: 'questions.list',
  question: 'questions.selected',
  questionSchema: 'questions.schema',
  indicators: 'indicators.list',
  loading: 'questions.loading',
  page: 'questions.page',
  total: 'questions.total',
  posting: 'questions.posting',
  showForm: 'questions.showForm',
});
