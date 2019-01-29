import { Connect, getStakeholders } from '@codetanzania/emis-api-states';
import { Button, Col, Input, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './styles.css';
import DistrictsActionBar from './ActionBar';

const { Search } = Input;

/**
 * Render districts list which have search box, actions and districts list
 *
 * @class
 * @name Districts
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Districts extends Component {
  //   state = {
  //     showFilters: false,
  //   };

  static propTypes = {
    // loading: PropTypes.bool.isRequired,
    // contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    //   .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getStakeholders();
  }

  render() {
    const { page, total } = this.props;

    return (
      <div className="Districts">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for districts here ..."
              onChange={this.searchContacts}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Contact"
              onClick={this.openContactForm}
            >
              New Contact
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list header */}
        <DistrictsActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
      </div>
    );
  }
}

export default Connect(Districts, {
  districts: 'districts.list',
  loading: 'districts.loading',
  page: 'districts.page',
  total: 'districts.total',
});
