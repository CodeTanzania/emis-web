import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import IncidentTypesListHeader from '../ListHeader';
import IncidentTypesListItem from '../ListItem';

// eslint-disable-next-line jsdoc/require-returns
/**
 * @function
 * @name IncidentTypesList
 * @description Incident Types list item component. Render Incident Type list
 *
 * @param {object} props props object
 * @param {boolean} props.loading preload list of incident types
 * @param {object[]} props.incidenttype array list of incident types
 * @param {Function} props.onEdit function for editing single incident types
 * @version 0.1.0
 * @since 0.1.0
 */
const IncidentTypesList = ({ incidenttypes, loading, onEdit }) => (
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
          onEdit={() => onEdit(incidenttype)}
        />
      )}
    />
  </Fragment>
);

/* props validation */
IncidentTypesList.propTypes = {
  loading: PropTypes.bool.isRequired,
  incidenttypes: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default IncidentTypesList;
