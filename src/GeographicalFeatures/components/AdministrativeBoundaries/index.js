import { Connect, getFeatures } from '@codetanzania/emis-api-states';
import { Input, List, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AdminstrativeBoundaryListItem from './ListItem';
import AdminstrativeBoundariesActionBar from './ActionBar';
import './styles.css';

const { Search } = Input;

/**
 * Render adminstrative boundarie list which have search box and actions
 *
 * @class
 * @name AdminstrativeBoundaryList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdminstrativeBoundaryList extends Component {
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

  render() {
    const { adminstrativeBoundaries, loading, total, page } = this.props;
    return (
      <div className="AdminstrativeBoundaryList">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for adminstrative boundaries here here ..."
              onChange={({ target: { value } }) => getFeatures({ q: value })}
            />
            {/* end search input component */}
          </Col>
          {/* primary actions */}
          <Col span={3} offset={9} />
          {/* end primary actions */}
        </Row>
        {/* list action bar */}
        <AdminstrativeBoundariesActionBar total={total} page={page} />
        {/* end list action bar */}
        {/* list starts */}
        <List
          loading={loading}
          dataSource={adminstrativeBoundaries}
          renderItem={adminstrativeBoundary => (
            <AdminstrativeBoundaryListItem
              key={adminstrativeBoundary.name}
              name={adminstrativeBoundary.name}
              level={adminstrativeBoundary.level}
            />
          )}
        />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(AdminstrativeBoundaryList, {
  adminstrativeBoundaries: 'features.list',
  loading: 'features.loading',
  page: 'features.page',
  total: 'features.total',
});
