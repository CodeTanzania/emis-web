import { deleteStakeholder } from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { notifyError, notifySuccess } from '../../../../util';
import ContactsActionBar from '../ActionBar';
import ContactsListHeader from '../ListHeader';
import ContactsListItem from '../ListItem';

/**
 * Render ContactsList component which have actionBar, contacts header and
 * contacts list components
 *
 * @class
 * @name ContactsList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ContactsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
  };

  state = {
    selectedContacts: [],
  };

  /**
   * Handle select a single contact action
   *
   * @function
   * @name handleOnSelectContact
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectContact = contact => {
    const { selectedContacts } = this.state;
    this.setState({ selectedContacts: concat([], selectedContacts, contact) });
  };

  /**
   * Handle selected all contacts actions
   *
   * @function
   * @name handleSelectAll
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {};

  /**
   * Handle filter contacts by status action
   *
   * @function
   * @name handleFilterByStatus
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleFilterByStatus = () => {
    // if (status === 'All') {
    //   filterStakeholders({});
    // } else if (status === 'Active') {
    //   filterStakeholders({});
    // } else if (status === 'Archived') {
    //   filterStakeholders({});
    // }
  };

  /**
   * Handle deselect a single contact action
   *
   * @function
   * @name handleOnDeselectContact
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectContact = contact => {
    const { selectedContacts } = this.state;
    const selectedList = [...selectedContacts];

    remove(
      selectedList,
      item => item._id === contact._id // eslint-disable-line
    );

    this.setState({ selectedContacts: selectedList });
  };

  render() {
    const {
      contacts,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onNotify,
    } = this.props;
    const { selectedContacts } = this.state;
    const selectedContactsCount = this.state.selectedContacts.length;

    return (
      <Fragment>
        {/* list action bar */}
        <ContactsActionBar
          total={total}
          page={page}
          onFilter={onFilter}
          onNotify={() => {
            onNotify(selectedContacts);
          }}
          selectedItemCount={selectedContactsCount}
          onFilterByStatus={this.handleFilterByStatus}
        />
        {/* end action bar */}

        {/* contact list header */}
        <ContactsListHeader />
        {/* end contact list header */}

        {/* contacts list */}
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
              isSelected={
                // eslint-disable-next-line
                map(selectedContacts, item => item._id).includes(contact._id)
              }
              onSelectItem={() => {
                this.handleOnSelectContact(contact); // eslint-disable-line
              }}
              onDeselectItem={() => {
                this.handleOnDeselectContact(contact); // eslint-disable-line
              }}
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
        {/* end contacts list */}
      </Fragment>
    );
  }
}

export default ContactsList;
