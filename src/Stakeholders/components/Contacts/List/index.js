import { httpActions } from '@codetanzania/emis-api-client';
import {
  deleteFocalPerson,
  paginateFocalPeople,
  refreshFocalPeople,
} from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ListHeader from '../../../../components/ListHeader';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';
import ContactsListItem from '../ListItem';

/* constants */
const headerLayout = [
  { span: 3, header: 'Name' },
  { span: 2, header: 'Agency' },
  { span: 5, header: 'Role' },
  { span: 4, header: 'Area' },
  { span: 2, header: 'Mobile Number' },
  { span: 3, header: 'Email Address' },
];
const { getFocalPeopleExportUrl } = httpActions;

/**
 * @class
 * @name ContactsList
 * @description Render ContactsList component which have actionBar, contacts
 * header and contacts list components
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
    onShare: PropTypes.func.isRequired,
    onBulkShare: PropTypes.func.isRequired,
  };

  state = {
    selectedContacts: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnSelectContact
   * @description Handle select a single contact action
   *
   * @param {Object} contact selected contact object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectContact = contact => {
    const { selectedContacts } = this.state;
    this.setState({ selectedContacts: concat([], selectedContacts, contact) });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all contacts actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedContacts, selectedPages } = this.state;
    const { contacts, page } = this.props;
    const selectedList = uniqBy([...selectedContacts, ...contacts], '_id');
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedContacts: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all contacts in a current page
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { contacts, page } = this.props;
    const { selectedContacts, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedContacts], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    contacts.forEach(contact => {
      remove(
        selectedList,
        item => item._id === contact._id // eslint-disable-line
      );
    });

    this.setState({
      selectedContacts: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleFilterByStatus
   * @description Handle filter contacts by status action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleFilterByStatus = () => {
    // if (status === 'All') {
    //   filter({});
    // } else if (status === 'Active') {
    //   filter({});
    // } else if (status === 'Archived') {
    //   filter({});
    // }
  };

  /**
   * @function
   * @name handleOnDeselectContact
   * @description Handle deselect a single contact action
   *
   * @param {Object} contact contact to be removed from selected contacts
   * @returns {undefined} undefined
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
      onShare,
      onBulkShare,
    } = this.props;
    const { selectedContacts, selectedPages } = this.state;
    const selectedContactsCount = this.state.selectedContacts.length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="focal person"
          page={page}
          total={total}
          selectedItemsCount={selectedContactsCount}
          exportUrl={getFocalPeopleExportUrl({
            filter: { _id: map(selectedContacts, '_id') },
          })}
          onFilter={onFilter}
          onNotify={() => onNotify(selectedContacts)}
          onPaginate={nextPage => {
            paginateFocalPeople(nextPage);
          }}
          onRefresh={() =>
            refreshFocalPeople(
              () => {
                notifySuccess('Focal People refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Focal People please contact system administrator'
                );
              }
            )
          }
          onShare={() => onBulkShare(selectedContacts)}
        />
        {/* end toolbar */}

        {/* contact list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end contact list header */}

        {/* contacts list */}
        <List
          loading={loading}
          dataSource={contacts}
          renderItem={contact => (
            <ContactsListItem
              key={contact._id} // eslint-disable-line
              abbreviation={contact.abbreviation}
              location={contact.location.name}
              name={contact.name}
              agency={contact.party ? contact.party.name : 'N/A'}
              agencyAbbreviation={
                contact.party ? contact.party.abbreviation : 'N/A'
              }
              role={contact.role ? contact.role.name : 'N/A'}
              email={contact.email}
              mobile={contact.mobile}
              isSelected={
                // eslint-disable-next-line
                map(selectedContacts, item => item._id).includes(contact._id)
              }
              onSelectItem={() => {
                this.handleOnSelectContact(contact);
              }}
              onDeselectItem={() => {
                this.handleOnDeselectContact(contact);
              }}
              onEdit={() => onEdit(contact)}
              onArchive={() =>
                deleteFocalPerson(
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
              onShare={() => {
                onShare(contact);
              }}
            />
          )}
        />
        {/* end contacts list */}
      </Fragment>
    );
  }
}

export default ContactsList;
