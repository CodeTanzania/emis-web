import {
  deleteAgency,
  paginateAgencies,
  refreshAgencies,
} from '@codetanzania/emis-api-states';
import { httpActions } from '@codetanzania/emis-api-client';
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

/* constants */
const headerLayout = [
  { span: 5, header: 'Form' },
  { span: 3, header: 'Title' },
  { span: 3, header: 'Sender' },
  { span: 4, header: 'TO' },
  { span: 4, header: 'Subject' },
];
const { getAgenciesExportUrl } = httpActions;

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
    seletedNotification: [],
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
    const { seletedNotification } = this.state;
    this.setState({
      seletedNotification: concat([], seletedNotification, notification),
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
    const { seletedNotification, selectedPages } = this.state;
    const { notifications, page } = this.props;
    const selectedList = uniqBy(
      [...seletedNotification, ...notifications],
      '_id'
    );
    const pages = uniq([...selectedPages, page]);
    this.setState({
      seletedNotification: selectedList,
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
    const { seletedNotification, selectedPages } = this.state;
    const selectedList = uniqBy([...seletedNotification], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    notifications.forEach(notification => {
      remove(
        selectedList,
        item => item._id === notification._id // eslint-disable-line
      );
    });

    this.setState({
      seletedNotification: selectedList,
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
    const { seletedNotification } = this.state;
    const selectedList = [...seletedNotification];

    remove(
      selectedList,
      item => item._id === notification._id // eslint-disable-line
    );

    this.setState({ seletedNotification: selectedList });
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
    const { seletedNotification, selectedPages } = this.state;
    const selectedAgenciesCount = intersectionBy(
      this.state.seletedNotification,
      notifications,
      '_id'
    ).length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="Agency"
          page={page}
          total={total}
          selectedItemsCount={selectedAgenciesCount}
          exportUrl={getAgenciesExportUrl({
            filter: { _id: map(seletedNotification, '_id') },
          })}
          onNotify={() => onNotify(seletedNotification)}
          onFilter={onFilter}
          onPaginate={nextPage => {
            paginateAgencies(nextPage);
          }}
          onRefresh={refreshAgencies}
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
                title={notification.role ? notification.role.name : 'N/A'}
                email={notification.email}
                mobile={notification.mobile}
                isSelected={
                  // eslint-disable-next-line
                  map(seletedNotification, item => item._id).includes(
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
                  deleteAgency(
                    notification._id, // eslint-disable-line
                    () => {
                      notifySuccess('Agency was archived successfully');
                    },
                    () => {
                      notifyError(
                        'An Error occurred while archiving Agency please notification system administrator'
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
