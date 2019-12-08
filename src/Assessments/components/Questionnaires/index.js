import {
  Connect,
  getQuestionnaires,
  openQuestionnaireForm,
  closeQuestionnaireForm,
  searchQuestionnaires,
  selectQuestionnaire,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import QuestionnairesActionBar from './ActionBar';
import QuestionnairesList from './List';
import QuestionnairesFilters from './Filters';
import QuestionnaireForm from './Form';
import './styles.css';

const { Search } = Input;

/**
 *
 * @class
 * @name Questionnaires
 * @description Render questionnaire list which have search box, actions and
 *  questionnaire list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Questionnaires extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    getQuestionnaires();
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
   *  false via state
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
   * @description Open questionnaire form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openQuestionnaireForm();
  };

  /**
   *
   * @function
   * @name closeForm
   * @description close questionnaire form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeForm = () => {
    closeQuestionnaireForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} questionnaire questionnaire object
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = questionnaire => {
    selectQuestionnaire(questionnaire);
    this.setState({ isEditForm: true });
    openQuestionnaireForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      questionnaires,
      loading,
      page,
      total,
      posting,
      showForm,
      questionnaire,
    } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="Questionnaires">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for questionnaires here ..."
              onChange={({ target: { value } }) =>
                searchQuestionnaires({ q: value })
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
              title="Add New Questionnaire"
              onClick={this.openForm}
            >
              New Questionnaire
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <QuestionnairesActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}

        {/* list starts */}
        <QuestionnairesList
          questionnaires={questionnaires}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}
        <Modal
          title="Filter Questionnaires"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <QuestionnairesFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Questionnaire' : 'Add New Questionnaire'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <QuestionnaireForm
            posting={posting}
            isEditForm={isEditForm}
            questionnaire={questionnaire}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

Questionnaires.propTypes = {
  loading: PropTypes.bool.isRequired,
  questionnaires: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  posting: PropTypes.bool.isRequired,
  questionnaire: PropTypes.shape({ name: PropTypes.string }),
  showForm: PropTypes.bool.isRequired,
};

Questionnaires.defaultProps = {
  questionnaire: null,
};

export default Connect(Questionnaires, {
  questionnaires: 'questionnaires.list',
  questionnaire: 'questionnaires.selected',
  loading: 'questionnaires.loading',
  page: 'questionnaires.page',
  total: 'questionnaires.total',
  posting: 'questionnaires.posting',
  showForm: 'questionnaires.showForm',
});
