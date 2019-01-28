import { Connect, getIncidentTypes } from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IncidentTypesActionBar from './ActionBar';
import './styles.css';
import IncidentTypesList from './List';

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

  render() {
    const { incidenttypes, page, total, loading } = this.props;
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
        <IncidentTypesActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
        <IncidentTypesList incidenttypes={incidenttypes} loading={loading} />
        {/* end list */}
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
