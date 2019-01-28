import { Connect, getItems } from '@codetanzania/emis-api-states';
import { Input, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ItemsActionBar from './ActionBar';
import ItemsList from './List';
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

  render() {
    const { items, loading, total, page } = this.props;
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
