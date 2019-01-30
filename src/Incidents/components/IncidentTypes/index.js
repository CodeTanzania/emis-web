import { Connect, getIncidentTypes } from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IncidentTypesActionBar from './ActionBar';
import IncidentTypesList from './List';
import IncidentTypesFilters from './Filters';
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
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    incidenttypes: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string })
    ).isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
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

  render() {
    const { incidenttypes, page, total, loading } = this.props;
    const { showFilters } = this.state;

    return (
      <div className="IncidentTypes">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for Incident Types here ..."
              onChange={({ target: { value } }) =>
                getIncidentTypes({ q: value })
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
        <IncidentTypesList incidenttypes={incidenttypes} loading={loading} />
        {/* end list */}
        <Modal
          title="Filter Incident Types"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
        >
          <IncidentTypesFilters onCancel={this.closeFiltersModal} />
        </Modal>
      </div>
    );
  }
}

export default Connect(IncidentTypes, {
  incidenttypes: 'incidentTypes.list',
  loading: 'incidentTypes.loading',
  page: 'incidentTypes.page',
  total: 'incidentTypes.total',
});
