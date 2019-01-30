import {
  Connect,
  getIncidentTypes,
  searchIncidentTypes,
  openIncidentTypeForm,
  closeIncidentTypeForm,
  selectIncidentType,
} from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IncidentTypesActionBar from './ActionBar';
import IncidentTypesList from './List';
import IncidentTypesFilters from './Filters';
import IncidentTypeForm from './Form';
import './styles.css';

const { Search } = Input;

/**
 * Render IncidentTypes list which have search box, actions and IncidentTypes list
 *
 * @class
 * @name IncidentTypes
 *
 * @version 0.1.0
 * @since 0.1.0
 */

class IncidentTypes extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    incidenttypes: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string })
    ).isRequired,
    incidenttype: PropTypes.shape({ name: PropTypes.string }),
    incidenttypeSchema: PropTypes.shape({
      properties: PropTypes.string,
    }).isRequired,

    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    posting: PropTypes.bool.isRequired,
    showForm: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    incidenttype: null,
  };

  componentWillMount() {
    getIncidentTypes();
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
   * Open incident type form
   *
   * @function
   * @name openIncidentTypeForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openIncidentTypeForm = () => {
    openIncidentTypeForm();
  };

  /**
   * close incident type form
   *
   * @function
   * @name closeIncidentTypeForm
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeIncidentTypeForm = () => {
    closeIncidentTypeForm();
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
  handleEdit = incidenttype => {
    selectIncidentType(incidenttype);
    this.setState({ isEditForm: true });
    openIncidentTypeForm();
  };

  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const {
      incidenttypes,
      incidenttype,
      loading,
      posting,
      page,
      showForm,
      total,
      incidenttypeSchema,
    } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="IncidentTypes">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for Incident Types here ..."
              onChange={({ target: { value } }) =>
                searchIncidentTypes({ q: value })
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
              title="Add New Incident Type"
              onClick={this.openIncidentTypeForm}
            >
              New Incident Type
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <IncidentTypesActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list header */}
        {/* list starts */}
        <IncidentTypesList
          incidenttypes={incidenttypes}
          loading={loading}
          onEdit={this.handleEdit}
        />
        {/* end list */}
        <Modal
          title="Filter Incident Types"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
        >
          <IncidentTypesFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Incident Type' : 'Add New Incident Type'}
          visible={showForm}
          footer={null}
          onCancel={this.closeIncidentTypeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <IncidentTypeForm
            posting={posting}
            isEditForm={isEditForm}
            incidenttype={incidenttype}
            onCancel={this.closeIncidentTypeForm}
            incidenttypeSchema={incidenttypeSchema}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(IncidentTypes, {
  incidenttypes: 'incidentTypes.list',
  loading: 'incidentTypes.loading',
  page: 'incidentTypes.page',
  total: 'incidentTypes.total',
  incidenttype: 'incidentTypes.selected',
  incidenttypeSchema: 'incidentTypes.schema',
  posting: 'incidentTypes.posting',
  showForm: 'incidentTypes.showForm',
});
