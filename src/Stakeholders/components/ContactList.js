import { Connect, getStakeholders } from '@codetanzania/emis-api-states';
import { Checkbox, Col, Icon, Input, List, Pagination, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContactListItem from './ContactListItem';
import './styles.css';

const { Search } = Input;
/**
 * Render action bar for actions which are applicable to list content
 *
 * @function
 * @name ContactsListHeader
 *
 * @param {Object} props
 * @param {number} props.total
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const ContactsListHeader = ({ total }) => (
  <div className="ContactListHeader">
    <Row>
      <Col span={1} xl={1} style={{ paddingLeft: 8 }}>
        <Checkbox />
      </Col>
      <Col span={1} xl={1}>
        <span className="actionIcon">
          <Icon
            type="reload"
            title="Refresh Contacts"
            onClick={() => getStakeholders()}
          />
        </span>
      </Col>
      <Col span={1} xl={1}>
        <Icon type="message" title="Send SMS to Selected Contacts" />
      </Col>
      <Col
        span={1}
        offset={17}
        xl={{ span: 1, offset: 16 }}
        xxl={{ span: 1, offset: 17 }}
      >
        <Icon type="filter" title="Filter Contacts" />
      </Col>
      <Col span={3} xl={4} xxl={3}>
        <Pagination
          simple
          defaultCurrent={2}
          total={total}
          onChange={page => getStakeholders({ page })}
        />
      </Col>
    </Row>
  </div>
);

/**
 * Render contact list which have search box, actions and contact list
 *
 * @function
 * @name ContactList
 *
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ContactList extends Component {
  propTypes = {
    loading: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    getStakeholders();
  }

  render() {
    const { contacts, loading, total } = this.props;
    return (
      <div className="ContactList">
        {/* search input component */}
        <Search
          size="large"
          placeholder="Search for stakeholders here ..."
          className="searchBox"
        />
        {/* end search input component */}
        {/* list header */}
        <ContactsListHeader total={total} />
        {/* end list header */}
        {/* list starts */}
        <List
          loading={loading}
          dataSource={contacts}
          renderItem={contact => (
            <ContactListItem
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

ContactsListHeader.propTypes = {
  total: PropTypes.number,
};

ContactsListHeader.defaultProps = {
  total: 0,
};

export default Connect(ContactList, {
  contacts: 'stakeholders.list',
  loading: 'stakeholders.loading',
  total: 'stakeholders.total',
});
