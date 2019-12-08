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
 * @class
 * @name IncidentTypes
 * @description  Render IncidentTypes list which have search box,
 * actions and IncidentTypes list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class IncidentTypes extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    showFilters: false,
    isEditForm: false,
  };

  componentDidMount() {
    getIncidentTypes();
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
   * @name openIncidentTypeForm
   * @description Open incident type form
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
   *
   * @function
   * @name closeIncidentTypeForm
   * @description close incident type form
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
   *
   *
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {object} incidenttype incidenttype passed when function is called
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

        {/* filter modal */}
        <Modal
          title="Filter Incident Types"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <IncidentTypesFilters onCancel={this.closeFiltersModal} />
        </Modal>
        {/* end of filter modal */}

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
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

IncidentTypes.propTypes = {
  loading: PropTypes.bool.isRequired,
  incidenttypes: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  incidenttype: PropTypes.shape({ name: PropTypes.string }),
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  posting: PropTypes.bool.isRequired,
  showForm: PropTypes.bool.isRequired,
};

IncidentTypes.defaultProps = {
  incidenttype: null,
};

export default Connect(IncidentTypes, {
  incidenttypes: 'incidentTypes.list',
  loading: 'incidentTypes.loading',
  page: 'incidentTypes.page',
  total: 'incidentTypes.total',
  incidenttype: 'incidentTypes.selected',
  posting: 'incidentTypes.posting',
  showForm: 'incidentTypes.showForm',
});
