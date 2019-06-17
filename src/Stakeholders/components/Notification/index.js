import { Connect, getFocalPeople } from '@codetanzania/emis-api-states';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Topbar from '../../../components/Topbar';
import './styles.css';

/* constants */

/**
 * @class
 * @name Notification
 * @description Render focalPerson list which have search box, actions and focalPerson list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Notification extends Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };

  static defaultProps = {
    searchQuery: undefined,
  };

  componentDidMount() {
    getFocalPeople();
  }

  render() {
    const { searchQuery } = this.props;

    return (
      <Fragment>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for notifications here ...',
            onChange: this.searchFocalPeople,
            value: searchQuery,
          }}
          actions={[
            {
              label: 'New Notification',
              icon: 'plus',
              size: 'large',
              title: 'Add Notification',
              onClick: this.openFocalPersonForm,
            },
          ]}
        />
        {/* end Topbar */}

        <div className="NotificationList" />
      </Fragment>
    );
  }
}

export default Connect(Notification, {
  searchQuery: 'focalPeople.q',
});
