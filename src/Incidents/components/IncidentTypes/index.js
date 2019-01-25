import { Connect, getStakeholders } from '@codetanzania/emis-api-states';
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
    contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getStakeholders();
  }

  render() {
    const { contacts, loading, page, total } = this.props;
    return (
      <div className="IncidentTypesList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for incidenttypes here ..."
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
        {/* <List
          loading={loading}
          dataSource={incidenttypes}
          renderItem={incidenttype => (
            <IncidentTypesListItem
              key={incidenttype.abbreviation}
              abbreviation={incidenttype.abbreviation}
              name={incidenttype.name}
              nature={incidenttype.nature}
              family={incidenttype.family}
              cap={incidenttype.cap}
              code={incidenttype.mobile}

            /> */}

        <List
          loading={loading}
          dataSource={contacts}
          renderItem={contact => (
            <IncidentTypesListItem
              key={contact.abbreviation}
              abbreviation={contact.abbreviation}
              name={contact.name}
              title={contact.title}
              email={contact.email}
              mobile={contact.mobile}
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
  contacts: 'stakeholders.list',
  loading: 'incidentTypes.loading',
  page: 'incidentTypes.page',
  total: 'incidentTypes.total',
});
