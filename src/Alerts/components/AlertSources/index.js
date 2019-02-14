import {
  closeAlertSourceForm,
  selectAlertSource,
  Connect,
  getAlertSources,
  searchAlertSources,
  openAlertSourceForm,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AlertSourcesActionBar from './ActionBar';
import AlertSourceForm from './Form';
import AlertSourceList from './List';
import './styles.css';

const { Search } = Input;

/**
 * @class
 * @name AlertSources
 * @description Render Alert Sources module which have search box
 * actions and source list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertSources extends Component {
  state = {
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    alertSource: PropTypes.shape({
      name: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
      url: PropTypes.string,
      website: PropTypes.string,
      _id: PropTypes.string,
    }),
    alertSources: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string,
        url: PropTypes.string,
        website: PropTypes.string,
        _id: PropTypes.string,
      })
    ).isRequired,
    posting: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
  };

  static defaultProps = {
    alertSource: null,
  };

  componentWillMount() {
    getAlertSources();
  }

  /**
   * @function
   * @name openForm
   * @description Open Alert Sources form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openAlertSourceForm();
  };

  /**
   * @function
   * @name closeForm
   * @description close Alert Sources form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeForm = () => {
    closeAlertSourceForm();
  };

  /**
   * @function
   * @name searchAlertSources
   * @description Search Alert Source List based on supplied filter word
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  search = event => {
    searchAlertSources(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {Object} alertSource alert source to be edited
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = alertSource => {
    selectAlertSource(alertSource);
    this.setState({ isEditForm: true });
    openAlertSourceForm();
  };

  /**
   * @function
   * @name handleAfterCloseForm
   * @description handle after form close actions
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      posting,
      page,
      showForm,
      total,
      alertSources,
      alertSource,
      loading,
    } = this.props;
    const { isEditForm } = this.state;
    return (
      <div className="AlertSources">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for alert sources here ..."
              onChange={this.search}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Alert Source"
              onClick={this.openForm}
            >
              New Alert Source
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <AlertSourcesActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
        <AlertSourceList
          alertSources={alertSources}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Alert Source' : 'Add New Alert Source'}
          visible={showForm}
          footer={null}
          maskClosable={false}
          onCancel={this.closeForm}
          destroyOnClose
        >
          <AlertSourceForm
            posting={posting}
            alertSource={alertSource}
            onCancel={this.closeForm}
            isEditForm={isEditForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(AlertSources, {
  alertSources: 'alertSources.list',
  alertSource: 'alertSources.selected',
  loading: 'alertSources.loading',
  posting: 'alertSources.posting',
  page: 'alertSources.page',
  total: 'alertSources.total',
  showForm: 'alertSources.showForm',
});
