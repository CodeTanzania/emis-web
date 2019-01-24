import { Connect, getStakeholders } from '@codetanzania/emis-api-states';
import { Input, List } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles.css';
import ContactsActionBar from './ActionBar';
import ContactsListItem from './ListItem';

const { Search } = Input;

/**
 * Render contact list which have search box, actions and contact list
 *
 * @class
 * @name ContactsList
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ContactsList extends Component {
  propTypes = {
    loading: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getStakeholders();
  }

  render() {
    const { contacts, loading, page, total } = this.props;
    return (
      <div className="ContactsList">
        {/* search input component */}
        <Search
          size="large"
          placeholder="Search for stakeholders here ..."
          className="searchBox"
        />
        {/* end search input component */}
        {/* list header */}
        <ContactsActionBar total={total} page={page} />
        {/* end list header */}
        {/* list starts */}
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
            />
          )}
        />
        {/* end list */}
      </div>
    );
  }
}

export default Connect(ContactsList, {
  contacts: 'stakeholders.list',
  loading: 'stakeholders.loading',
  page: 'stakeholders.page',
  total: 'stakeholders.total',
});
