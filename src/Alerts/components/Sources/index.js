import {
  closeStakeholderForm,
  Connect,
  getStakeholders,
  openStakeholderForm,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Modal, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SourcesActionBar from './ActionBar';
import SourceForm from './Form';
import SourceList from './List';
import './styles.css';

const { Search } = Input;
const sources = [
  {
    name: 'Tanzania meteorogical orgajisation',
    email: 'meteo@tma.org',
    mobile: '07654365322',
    url: 'tma.org',
    _id: '123',
  },
  {
    name: 'Anguilla: Disaster Management Anguilla',
    email: 'info@anguilla.org',
    mobile: '0745695322',
    url: 'anguilla.org',
    _id: '1234',
  },
  {
    name: 'Tanzania meteorogical orgajisation',
    email: 'meteo@tma.org',
    mobile: '07654365322',
    url: 'tma.org',
    _id: '1236',
  },
  {
    name: 'Anguilla: Disaster Management Anguilla',
    email: 'info@anguilla.org',
    mobile: '0745695322',
    url: 'anguilla.org',
    _id: '1237',
  },
  {
    name: 'Anguilla: Disaster Management Anguilla',
    email: 'info@anguilla.org',
    mobile: '0745695322',
    url: 'anguilla.org',
    _id: '1238',
  },
];
const loading = false;

/**
 * Render source module which have search box, actions and source list
 *
 * @class
 * @name SourcesList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Sources extends Component {
  static propTypes = {
    posting: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
    showForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getStakeholders();
  }

  /**
   * Open sources form
   *
   * @function
   * @name openSourcesForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openSourcesForm = () => {
    openStakeholderForm();
  };

  /**
   * close sources form
   *
   * @function
   * @name openSourcesForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeSourcesForm = () => {
    closeStakeholderForm();
  };

  /**
   * Search Source List based on supplied filter word
   *
   * @function
   * @name searchSources
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchSources = event => {
    console.log(event);
  };

  render() {
    const { posting, page, showForm, total } = this.props;
    return (
      <div className="Sources">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for sources here ..."
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
              title="Add New Source"
              onClick={this.openSourcesForm}
            >
              New Source
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <SourcesActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
        <SourceList sources={sources} loading={loading} />
        {/* end list */}

        {/* create/edit form modal */}
        <Modal
          title="Add New Source"
          visible={showForm}
          footer={null}
          onCancel={this.closeSourcesForm}
          destroyOnClose
        >
          <SourceForm posting={posting} onCancel={this.closeSourcesForm} />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Sources, {
  loading: 'stakeholders.loading',
  posting: 'stakeholders.posting',
  page: 'stakeholders.page',
  total: 'stakeholders.total',
  showForm: 'stakeholders.showForm',
});
