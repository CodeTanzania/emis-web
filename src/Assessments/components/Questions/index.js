import { Connect, getQuestions } from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import QuestionsActionBar from './ActionBar';
import QuestionsList from './List';
import QuestionFilters from './Filters';
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
  };

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

  render() {
    const { questions, loading, page, total } = this.props;
    const { showFilters } = this.state;

    return (
      <div className="Questions">
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
        <QuestionsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}
        {/* list starts */}
        <QuestionsList questions={questions} loading={loading} />
        {/* end list */}
        <Modal
          title="Filter Questions"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
        >
          <QuestionFilters onCancel={this.closeFiltersModal} />
        </Modal>
      </div>
    );
  }
}

export default Connect(Questions, {
  questions: 'questions.list',
  loading: 'questions.loading',
  page: 'questions.page',
  total: 'questions.total',
});
