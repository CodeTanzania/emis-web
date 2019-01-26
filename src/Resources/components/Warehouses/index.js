import { Connect, getWarehouses } from '@codetanzania/emis-api-states';
import { Input, List, Col, Row, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import WarehouseListItem from './ListItem';
import WarehousesActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * Render warehouses list which have search box and actions
 *
 * @class
 * @name WarehouseList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class WarehouseList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    warehouses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        level: PropTypes.string,
      })
    ).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getWarehouses();
  }

  render() {
    const { warehouses, loading, total, page } = this.props;
    return (
      <div className="WarehouseList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for warehouses here ..."
              onChange={({ target: { value } }) => getWarehouses({ q: value })}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Warehouse"
            >
              New Warehouse
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <WarehousesActionBar total={total} page={page} />
        {/* end list action bar */}
        {/* list starts */}
        <List
          loading={loading}
          dataSource={warehouses}
          renderItem={warehouse => (
            <WarehouseListItem
              key={warehouse.name}
              name={warehouse.name}
              level={warehouse.level}
            />
          )}
        />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(WarehouseList, {
  warehouses: 'warehouses.list',
  loading: 'warehouses.loading',
  page: 'warehouses.page',
  total: 'warehouses.total',
});
