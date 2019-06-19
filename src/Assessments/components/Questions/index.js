import {
  Connect,
  getQuestions,
  searchQuestions,
  openQuestionForm,
  closeQuestionForm,
  selectQuestion,
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
 *
 * @class
 * @name Questions
 * @description Render question list which have search box, actions and
 * question list
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
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    posting: PropTypes.bool.isRequired,
    question: PropTypes.shape({ name: PropTypes.string }),
    showForm: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    question: null,
  };

  componentDidMount() {
    getQuestions();
  }

  /**
   *
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property to
   * false via state
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
   *
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible property to
   * false via state
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
   *
   * @function
   * @name openForm
   * @description Open question form
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
   *
   * @function closeForm
   * @name
   * @description close question form
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
   *
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} question question object
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = question => {
    selectQuestion(question);
    this.setState({ isEditForm: true });
    openQuestionForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
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

        {/* filter modal */}
        <Modal
          title="Filter Questions"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <QuestionFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end of filter modal */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Question' : 'Add New Question'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <QuestionForm
            posting={posting}
            isEditForm={isEditForm}
            question={question}
            onCancel={this.closeForm}
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
  loading: 'questions.loading',
  page: 'questions.page',
  total: 'questions.total',
  posting: 'questions.posting',
  showForm: 'questions.showForm',
});
