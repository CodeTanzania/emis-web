import {
  closeAlertSourceForm,
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
 * Render Alert Sources module which have search box, actions and source list
 *
 * @class
 * @name AlertSources
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertSources extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
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

  componentWillMount() {
    getAlertSources();
  }

  /**
   * Open Alert Sources form
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
    openAlertSourceForm();
  };

  /**
   * close Alert Sources form
   *
   * @function
   * @name closeForm
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
   * Search Alert Source List based on supplied filter word
   *
   * @function
   * @name searchAlertSources
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchAlertSources = event => {
    searchAlertSources(event.target.value);
  };

  render() {
    const {
      posting,
      page,
      showForm,
      total,
      alertSources,
      loading,
    } = this.props;
    return (
      <div className="AlertSources">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for alert sources here ..."
              onChange={this.searchSources}
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
        <AlertSourceList alertSources={alertSources} loading={loading} />
        {/* end list */}

        {/* create/edit form modal */}
        <Modal
          title="Add New Alert Source"
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
        >
          <AlertSourceForm posting={posting} onCancel={this.closeForm} />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(AlertSources, {
  alertSources: 'alertSources.list',
  loading: 'alertSources.loading',
  posting: 'alertSources.posting',
  page: 'alertSources.page',
  total: 'alertSources.total',
  showForm: 'alertSources.showForm',
});
