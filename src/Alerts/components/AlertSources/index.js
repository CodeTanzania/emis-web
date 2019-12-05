import {
  closeAlertSourceForm,
  Connect,
  getAlertSources,
  openAlertSourceForm,
  searchAlertSources,
  selectAlertSource,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AlertSourceForm from './Form';
import AlertSourceList from './List';
import './styles.css';

/* constants */
const { Search } = Input;

/**
 * @class
 * @name AlertSources
 * @description Render alertSource list which have search box, actions and alertSource list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertSources extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    isEditForm: false,
  };

  componentDidMount() {
    getAlertSources();
  }

  /**
   * @function
   * @name openAlertSourceForm
   * @description Open alertSource form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openAlertSourceForm = () => {
    openAlertSourceForm();
  };

  /**
   * @function
   * @name openAlertSourceForm
   * @description close alertSource form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeAlertSourceForm = () => {
    closeAlertSourceForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchAlertSources
   * @description Search AlertSources List based on supplied filter word
   *
   * @param {object} event - Event instance
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchAlertSources = event => {
    searchAlertSources(event.target.value);
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} alertSource alertSource to be edited
   *
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
   * @description Perform post close form cleanups
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      alertSources,
      alertSource,
      loading,
      posting,
      page,
      showForm,
      searchQuery,
      total,
    } = this.props;
    const { isEditForm } = this.state;
    return (
      <div className="AlertSources">
        <Row>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for Alert Sources here ..."
              onChange={this.searchAlertSources}
              allowClear
              value={searchQuery}
              className="searchBox"
            />
            {/* end search input component */}
          </Col>

          {/* primary actions */}
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Row type="flex" justify="end">
              <Col xxl={6} xl={6} lg={6} md={8} sm={24} xs={24}>
                <Button
                  type="primary"
                  icon="plus"
                  size="large"
                  title="Add New AlertSource"
                  onClick={this.openAlertSourceForm}
                  block
                >
                  New AlertSource
                </Button>
              </Col>
            </Row>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list starts */}
        <AlertSourceList
          total={total}
          page={page}
          alertSources={alertSources}
          loading={loading}
          onEdit={this.handleEdit}
          onFilter={this.openFiltersModal}
          onNotify={this.openNotificationForm}
          onShare={this.handleShare}
          onBulkShare={this.handleBulkShare}
        />
        {/* end list */}
        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit AlertSource' : 'Add New AlertSource'}
          visible={showForm}
          width="50%"
          footer={null}
          onCancel={this.closeAlertSourceForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <AlertSourceForm
            posting={posting}
            isEditForm={isEditForm}
            alertSource={alertSource}
            onCancel={this.closeAlertSourceForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

AlertSources.propTypes = {
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
  searchQuery: PropTypes.string,
};

AlertSources.defaultProps = {
  alertSource: null,
  searchQuery: undefined,
};

export default Connect(AlertSources, {
  alertSources: 'alertSources.list',
  alertSource: 'alertSources.selected',
  loading: 'alertSources.loading',
  posting: 'alertSources.posting',
  page: 'alertSources.page',
  showForm: 'alertSources.showForm',
  total: 'alertSources.total',
  searchQuery: 'alertSources.q',
});
