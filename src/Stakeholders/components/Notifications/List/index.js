import { httpActions } from '@codetanzania/emis-api-client';
import {
  paginateCampaigns,
  refreshCampaigns,
  deleteCampaign,
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
import CampaignListItem from '../ListItem';

const { getCampaignsExportUrl } = httpActions;

/* constants */
const headerLayout = [
  { span: 6, header: 'Title' },
  { span: 4, header: 'Form' },
  { span: 4, header: 'Sent' },
  { span: 5, header: 'Sent Date' },
];

/**
 * @class
 * @name CampaignList
 * @description Render CampaignList component which have actionBar
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class CampaignList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    campaigns: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
  };

  state = {
    selectedCampaign: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnselectCampaign
   * @description Handle select a single campaign action
   *
   * @param {object} campaign selected campaign object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnselectCampaign = campaign => {
    const { selectedCampaign } = this.state;
    this.setState({
      selectedCampaign: concat([], selectedCampaign, campaign),
    });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all campaigns actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedCampaign, selectedPages } = this.state;
    const { campaigns, page } = this.props;
    const selectedList = uniqBy([...selectedCampaign, ...campaigns], '_id');
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedCampaign: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all campaigns in a current page
   *
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { campaigns, page } = this.props;
    const { selectedCampaign, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedCampaign], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    campaigns.forEach(campaign => {
      remove(
        selectedList,
        item => item._id === campaign._id // eslint-disable-line
      );
    });

    this.setState({
      selectedCampaign: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleOnDeselectCampaign
   * @description Handle deselect a single campaign action
   *
   * @param {object} campaign campaign to be removed from selected campaigns
   * @returns {undefined}
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectCampaign = campaign => {
    const { selectedCampaign } = this.state;
    const selectedList = [...selectedCampaign];

    remove(
      selectedList,
      item => item._id === campaign._id // eslint-disable-line
    );

    this.setState({ selectedCampaign: selectedList });
  };

  render() {
    const { campaigns, loading, page, total, onEdit, onFilter } = this.props;
    const { selectedCampaign, selectedPages } = this.state;
    const selectedCampaignCount = intersectionBy(
      selectedCampaign,
      campaigns,
      '_id'
    ).length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="Notification"
          page={page}
          total={total}
          selectedItemsCount={selectedCampaignCount}
          exportUrl={getCampaignsExportUrl({
            filter: { _id: map(selectedCampaign, '_id') },
          })}
          onFilter={onFilter}
          onPaginate={nextPage => {
            paginateCampaigns(nextPage);
          }}
          onRefresh={() =>
            refreshCampaigns(
              () => {
                notifySuccess('Notifications refreshed successfully');
              },
              () => {
                notifyError(
                  'An Error occurred while refreshing Notifications please contact system administrator'
                );
              }
            )
          }
        />
        {/* end toolbar */}

        {/* campaign list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end campaign list header */}

        {/* campaigns list */}
        <List
          loading={loading}
          dataSource={campaigns}
          renderItem={campaign => {
            return (
              <CampaignListItem
                key={campaign._id} // eslint-disable-line
                form={campaign.form}
                title={campaign.title}
                sent={campaign.statistics.sent}
                sentAt={campaign.createdAt}
                isSelected={
                  // eslint-disable-next-line
                  map(selectedCampaign, item => item._id).includes(
                    // eslint-disable-next-line
                    campaign._id
                  )
                }
                onSelectItem={() => {
                  this.handleOnselectCampaign(campaign);
                }}
                onDeselectItem={() => {
                  this.handleOnDeselectCampaign(campaign);
                }}
                onEdit={() => onEdit(campaign)}
                onArchive={() =>
                  deleteCampaign(
                    campaign._id, // eslint-disable-line
                    () => {
                      notifySuccess('Notification was archived successfully');
                    },
                    () => {
                      notifyError(
                        'An Error occurred while archiving Notification please contact system administrator'
                      );
                    }
                  )
                }
              />
            );
          }}
        />
        {/* end campaigns list */}
      </Fragment>
    );
  }
}

export default CampaignList;
