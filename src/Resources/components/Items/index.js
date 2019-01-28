import { Connect, getItems } from '@codetanzania/emis-api-states';
import { Input, Col, Row, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ItemsActionBar from './ActionBar';
import ItemsList from './List';
import ItemsFilters from './Filters';
import './styles.css';

const { Search } = Input;

/**
 * Render item list which have search box and actions
 *
 * @class
 * @name Items
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Items extends Component {
  state = {
    showFilters: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        description: PropTypes.string,
        color: PropTypes.string,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getItems();
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
    const { items, loading, total, page } = this.props;
    const { showFilters } = this.state;
    return (
      <div className="Items">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for items here ..."
              onChange={({ target: { value } }) => getItems({ q: value })}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Item"
            >
              New Item
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <ItemsActionBar total={total} page={page} />
        {/* end list action bar */}
        {/* list starts */}
        <ItemsList items={items} loading={loading} />
        {/* end list */}
        <Modal
          title="Filter Items"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
        >
          <ItemsFilters onCancel={this.closeFiltersModal} />
        </Modal>
      </div>
    );
  }
}

export default Connect(Items, {
  items: 'items.list',
  loading: 'items.loading',
  page: 'items.page',
  total: 'items.total',
});
