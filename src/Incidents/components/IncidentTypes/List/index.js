import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import IncidentTypesListHeader from '../ListHeader';
import IncidentTypesListItem from '../ListItem';

const IncidentTypesList = ({ incidenttypes, loading }) => (
  <Fragment>
    <IncidentTypesListHeader />
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
  </Fragment>
);

IncidentTypesList.propTypes = {
  loading: PropTypes.bool.isRequired,
  incidenttypes: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
};

export default IncidentTypesList;
