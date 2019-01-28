import { Connect, getFeatures } from '@codetanzania/emis-api-states';
import { Input, Modal, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AdminstrativeBoundaryList from './List';
import AdminstrativeBoundaryFilters from './Filters';
import AdminstrativeBoundariesActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * Render Adminstrative Boundary module which has search box, actions and list of Adminstrative Boundaries
 *
 * @class
 * @name AdminstrativeBoundary
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdminstrativeBoundaries extends Component {
  state = {
    showFilters: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    adminstrativeBoundaries: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        level: PropTypes.string,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getFeatures();
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
   * Search AdminstrativeBoundaries List based on supplied filter word
   *
   * @function
   * @name searchAdminstrativeBoundaries
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchAdminstrativeBoundaries = event => {
    getFeatures({ q: event.target.value });
  };

  render() {
    const { adminstrativeBoundaries, loading, total, page } = this.props;
    const { showFilters } = this.state;
    return (
      <div className="AdminstrativeBoundaries">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for adminstrative boundaries here here ..."
              onChange={this.searchAdminstrativeBoundaries}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9} />
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <AdminstrativeBoundariesActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}
        {/* list starts */}
        <AdminstrativeBoundaryList
          adminstrativeBoundaries={adminstrativeBoundaries}
          loading={loading}
        />
        {/* end list */}
        <Modal
          title="Filter AdminstrativeBoundaries"
          width={800}
          maskClosable={false}
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
        >
          <AdminstrativeBoundaryFilters onCancel={this.closeFiltersModal} />
        </Modal>
      </div>
    );
  }
}

export default Connect(AdminstrativeBoundaries, {
  adminstrativeBoundaries: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
