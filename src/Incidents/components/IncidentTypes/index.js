import { Connect, getIncidentTypes } from '@codetanzania/emis-api-states';
import { Button, Col, Input, List, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IncidentTypesActionBar from './ActionBar';
import IncidentTypesListItem from './ListItem';
import './styles.css';

const { Search } = Input;

/**
 * Render IncidentTypes list which have search box, actions and IncidentTypes list
 *
 * @class
 * @name IncidentTypesList
 *
 * @version 0.1.0
 * @since 0.1.0
 */

class IncidentTypesList extends Component {
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
    const { incidenttypes, loading, page, total } = this.props;
    return (
      <div className="IncidentTypesList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for incidenttypes here ..."
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
              title="Add New Incidenttype"
            >
              New Incidenttype
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list header */}
        <IncidentTypesActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
        <List
          loading={loading}
          dataSource={incidenttypes}
          renderItem={incidenttype => (
            <IncidentTypesListItem
              key={incidenttype.color}
              color={incidenttype.color}
              name={incidenttype.name}
              nature={incidenttype.nature}
              family={incidenttype.family}
              cap={incidenttype.cap}
              code={incidenttype.code}
            />
          )}
        />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(IncidentTypesList, {
  incidenttypes: 'incidentTypes.list',
  loading: 'incidentTypes.loading',
  page: 'incidentTypes.page',
  total: 'incidentTypes.total',
});
