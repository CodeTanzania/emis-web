import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import AdminstrativeBoundaryListHeader from '../ListHeader';
import AdminstrativeBoundaryListItem from '../ListItem';

/**
 * Render AdminstrativeBoundary list which have search box and actions
 *
 * @class
 * @name AdminstrativeBoundaryList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const AdminstrativeBoundaryList = ({ adminstrativeBoundaries, loading }) => (
  <Fragment>
    <AdminstrativeBoundaryListHeader />
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
  </Fragment>
);

AdminstrativeBoundaryList.propTypes = {
  loading: PropTypes.bool.isRequired,
  adminstrativeBoundaries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      level: PropTypes.string,
    })
  ).isRequired,
};

export default AdminstrativeBoundaryList;
