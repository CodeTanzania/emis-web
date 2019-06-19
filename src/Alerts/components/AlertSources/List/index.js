import {
  deleteAlertSource,
  paginateAlertSources,
  refreshAlertSources,
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
import AlertSourceListItem from '../ListItem';

const headerLayout = [
  { span: 5, header: 'Organization' },
  { span: 3, header: 'Email' },
  { span: 3, header: 'Phone' },
  { span: 4, header: 'Website' },
  { span: 5, header: 'Feed Url' },
];

const { getAlertSourcesExportUrl } = httpActions;

/**
 * @class
 * @name AlertSourceList
 * @description Render AlertSourceList component which have actionBar, alertSources header and
 * alertSource list item components
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AlertSourceList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    alertSources: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string,
        _id: PropTypes.string,
      })
    ).isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
  };

  state = {
    selectedAlertSources: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnSelectAlertSource
   * @description Handle select a single alertSource action
   *
   * @param {object} alertSource selected alertSource object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectAlertSource = alertSource => {
    const { selectedAlertSources } = this.state;
    this.setState({
      selectedAlertSources: concat([], selectedAlertSources, alertSource),
    });
  };

  /**
   * @function
   * @name handleFilterByStatus
   * @description Handle filter alertSources by status action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleFilterByStatus = () => {};

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all alertSources actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedAlertSources, selectedPages } = this.state;
    const { alertSources, page } = this.props;
    const selectedList = uniqBy(
      [...selectedAlertSources, ...alertSources],
      '_id'
    );
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedAlertSources: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all alertSources in a current page
   *
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { alertSources, page } = this.props;
    const { selectedAlertSources, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedAlertSources], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    alertSources.forEach(alertSource => {
      remove(
        selectedList,
        item => item._id === alertSource._id // eslint-disable-line
      );
    });

    this.setState({
      selectedAlertSources: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleOnDeselectAlertSource
   * @description Handle deselect a single alertSource action
   *
   * @param {object} alertSource alertSource to be removed from selected alertSources
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectAlertSource = alertSource => {
    const { selectedAlertSources } = this.state;
    const selectedList = [...selectedAlertSources];

    remove(
      selectedList,
      item => item._id === alertSource._id // eslint-disable-line
    );

    this.setState({ selectedAlertSources: selectedList });
  };

  render() {
    const { alertSources, loading, page, total, onEdit, onShare } = this.props;
    const { selectedAlertSources, selectedPages } = this.state;
    const selectedAlertSourcesCount = intersectionBy(
      this.state.selectedAlertSources,
      alertSources,
      '_id'
    ).length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="AlertSource"
          page={page}
          total={total}
          selectedItemsCount={selectedAlertSourcesCount}
          exportUrl={getAlertSourcesExportUrl({
            filter: { _id: map(selectedAlertSources, '_id') },
          })}
          onPaginate={nextPage => {
            paginateAlertSources(nextPage);
          }}
          onRefresh={() =>
            refreshAlertSources(
              () => {
                notifySuccess('AlertSources refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing AlertSources please contact system administrator'
                );
              }
            )
          }
        />
        {/* end toolbar */}

        {/* alertSource list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end alertSource list header */}

        {/* alertSources list */}
        <List
          loading={loading}
          dataSource={alertSources}
          renderItem={alertSource => {
            return (
              <AlertSourceListItem
                key={alertSource._id} // eslint-disable-line
                name={alertSource.name}
                url={alertSource.url}
                email={alertSource.email}
                mobile={alertSource.mobile}
                website={alertSource.website}
                onShare={() => {
                  onShare(alertSource);
                }}
                isSelected={
                  // eslint-disable-next-line
                  map(selectedAlertSources, item => item._id).includes(
                    alertSource._id // eslint-disable-line
                  )
                }
                onSelectItem={() => {
                  this.handleOnSelectAlertSource(alertSource);
                }}
                onDeselectItem={() => {
                  this.handleOnDeselectAlertSource(alertSource);
                }}
                onEdit={() => onEdit(alertSource)}
                onArchive={() =>
                  deleteAlertSource(
                    alertSource._id, // eslint-disable-line
                    () => {
                      notifySuccess('AlertSource was archived successfully');
                    },
                    () => {
                      notifyError(
                        'An Error occurred while archiving AlertSource please alertSource system administrator'
                      );
                    }
                  )
                }
              />
            );
          }}
        />
        {/* end alertSources list */}
      </Fragment>
    );
  }
}

export default AlertSourceList;
