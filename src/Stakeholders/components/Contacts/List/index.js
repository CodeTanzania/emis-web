import { deleteStakeholder } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import ContactsListHeader from '../ListHeader';
import ContactsListItem from '../ListItem';

const ContactsList = ({ contacts, loading, onEdit }) => (
  <Fragment>
    <ContactsListHeader />
    <List
      loading={loading}
      dataSource={contacts}
      renderItem={contact => (
        <ContactsListItem
          key={contact.abbreviation}
          abbreviation={contact.abbreviation}
          name={contact.name}
          title={contact.title}
          email={contact.email}
          mobile={contact.mobile}
          onEdit={() => onEdit(contact)}
          onArchive={() =>
            deleteStakeholder(
              contact._id, // eslint-disable-line
              () => {
                notifySuccess('Contact was archived successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while archiving Contact please contact system administrator'
                );
              }
            )
          }
        />
      )}
    />
  </Fragment>
);

ContactsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ContactsList;
