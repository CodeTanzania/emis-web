import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import SubwardsListItem from '../ListItem';
import SubwardsListHeader from '../ListHeader';

const SubwardsList = ({ subwards, loading }) => (
  <Fragment>
    <SubwardsListHeader />
    <List
      loading={loading}
      dataSource={subwards}
      renderItem={subward => (
        <SubwardsListItem
          key={subward.name}
          name={subward.name}
          category={subward.category}
          type={subward.type}
          country={subward.country}
        />
      )}
    />
  </Fragment>
);

SubwardsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  subwards: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default SubwardsList;
