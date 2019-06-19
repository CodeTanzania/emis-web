import { httpActions } from '@codetanzania/emis-api-client';
import {
  paginateFocalPeople,
  refreshFocalPeople,
  deleteFocalPerson,
} from '@codetanzania/emis-api-states';
import { List } from 'antd';
import concat from 'lodash/concat';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';
import intersectionBy from 'lodash/intersectionBy';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ListHeader from '../../../../components/ListHeader';
import { notifyError, notifySuccess } from '../../../../util';
import Toolbar from '../../../../components/Toolbar';
import NotificationListItem from '../ListItem';

const { getFocalPeopleExportUrl } = httpActions;

/* constants */
const headerLayout = [
  { span: 5, header: 'Title' },
  { span: 3, header: 'Form' },
  { span: 3, header: 'Sender' },
  { span: 4, header: 'To' },
  { span: 4, header: 'Subject' },
];

/**
 * @class
 * @name NotificationList
 * @description Render NotificationList component which have actionBar
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class NotificationList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string })
    ).isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
  };

  state = {
    selectedNotification: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnselectNotification
   * @description Handle select a single notification action
   *
   * @param {object} notification selected notification object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnselectNotification = notification => {
    const { selectedNotification } = this.state;
    this.setState({
      selectedNotification: concat([], selectedNotification, notification),
    });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all notifications actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedNotification, selectedPages } = this.state;
    const { notifications, page } = this.props;
    const selectedList = uniqBy(
      [...selectedNotification, ...notifications],
      '_id'
    );
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedNotification: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all notifications in a current page
   *
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { notifications, page } = this.props;
    const { selectedNotification, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedNotification], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    notifications.forEach(notification => {
      remove(
        selectedList,
        item => item._id === notification._id // eslint-disable-line
      );
    });

    this.setState({
      selectedNotification: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleOnDeselectNotification
   * @description Handle deselect a single notification action
   *
   * @param {object} notification notification to be removed from selected notifications
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectNotification = notification => {
    const { selectedNotification } = this.state;
    const selectedList = [...selectedNotification];

    remove(
      selectedList,
      item => item._id === notification._id // eslint-disable-line
    );

    this.setState({ selectedNotification: selectedList });
  };

  render() {
    const {
      notifications,
      loading,
      page,
      total,
      onEdit,
      onNotify,
      onFilter,
    } = this.props;
    const { selectedNotification, selectedPages } = this.state;
    const selectedNotificationCount = intersectionBy(
      this.state.selectedNotification,
      notifications,
      '_id'
    ).length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="Notification"
          page={page}
          total={total}
          selectedItemsCount={selectedNotificationCount}
          exportUrl={getFocalPeopleExportUrl({
            filter: { _id: map(selectedNotification, '_id') },
          })}
          onFilter={onFilter}
          onNotify={() => onNotify(selectedNotification)}
          onPaginate={nextPage => {
            paginateFocalPeople(nextPage);
          }}
          onRefresh={() =>
            refreshFocalPeople(
              () => {
                notifySuccess('Notification refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Notification please contact system administrator'
                );
              }
            )
          }
        />
        {/* end toolbar */}

        {/* notification list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end notification list header */}

        {/* notifications list */}
        <List
          loading={loading}
          dataSource={notifications}
          renderItem={notification => {
            return (
              <NotificationListItem
                key={notification._id} // eslint-disable-line
                name={notification.name}
                email={notification.email}
                mobile={notification.mobile}
                isSelected={
                  // eslint-disable-next-line
                  map(selectedNotification, item => item._id).includes(
                    // eslint-disable-next-line
                    notification._id
                  )
                }
                onSelectItem={() => {
                  this.handleOnselectNotification(notification);
                }}
                onDeselectItem={() => {
                  this.handleOnDeselectNotification(notification);
                }}
                onEdit={() => onEdit(notification)}
                onArchive={() =>
                  deleteFocalPerson(
                    notification._id, // eslint-disable-line
                    () => {
                      notifySuccess('Notification was archived successfully');
                    },
                    () => {
                      notifyError(
                        'An Error occurred while archiving Notification please notification system administrator'
                      );
                    }
                  )
                }
              />
            );
          }}
        />
        {/* end notifications list */}
      </Fragment>
    );
  }
}

export default NotificationList;
