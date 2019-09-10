import { httpActions } from '@codetanzania/emis-api-client';
import {
  deleteFocalPerson,
  paginateFocalPeople,
  refreshFocalPeople,
} from '@codetanzania/emis-api-states';
import { List } from 'antd';
import compact from 'lodash/compact';
import concat from 'lodash/concat';
import intersectionBy from 'lodash/intersectionBy';
import map from 'lodash/map';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import ListHeader from '../../../../components/ListHeader';
import Toolbar from '../../../../components/Toolbar';
import { notifyError, notifySuccess } from '../../../../util';
import FocalPersonsListItem from '../ListItem';

/* constants */
const nameSpan = { xxl: 3, xl: 3, lg: 3, md: 5, sm: 10, xs: 10 };
const phoneSpan = { xxl: 2, xl: 3, lg: 3, md: 4, sm: 9, xs: 9 };
const emailSpan = { xxl: 4, xl: 4, lg: 5, md: 7, sm: 0, xs: 0 };
const roleSpan = { xxl: 8, xl: 7, lg: 7, md: 0, sm: 0, xs: 0 };
const areaSpan = { xxl: 5, xl: 5, lg: 4, md: 5, sm: 0, xs: 0 };

const headerLayout = [
  { ...nameSpan, header: 'Name' },
  { ...roleSpan, header: 'Title & Organization' },
  { ...phoneSpan, header: 'Phone Number' },
  { ...emailSpan, header: 'Email' },
  { ...areaSpan, header: 'Area' },
];
const { getFocalPeopleExportUrl } = httpActions;

/**
 * @class
 * @name FocalPersonsList
 * @description Render FocalPersonsList component which have actionBar, focal People
 * header and focal People list components
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class FocalPersonsList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    focalPeople: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
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
    selectedFocalPeople: [],
    selectedPages: [],
  };

  /**
   * @function
   * @name handleOnSelectFocalPerson
   * @description Handle select a single focalPerson action
   *
   * @param {object} focalPerson selected focalPerson object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnSelectFocalPerson = focalPerson => {
    const { selectedFocalPeople } = this.state;
    this.setState({
      selectedFocalPeople: concat([], selectedFocalPeople, focalPerson),
    });
  };

  /**
   * @function
   * @name handleSelectAll
   * @description Handle select all focalPeople actions from current page
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleSelectAll = () => {
    const { selectedFocalPeople, selectedPages } = this.state;
    const { focalPeople, page } = this.props;
    const selectedList = uniqBy(
      [...selectedFocalPeople, ...focalPeople],
      '_id'
    );
    const pages = uniq([...selectedPages, page]);
    this.setState({
      selectedFocalPeople: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleDeselectAll
   * @description Handle deselect all focalPeople in a current page
   *
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDeselectAll = () => {
    const { focalPeople, page } = this.props;
    const { selectedFocalPeople, selectedPages } = this.state;
    const selectedList = uniqBy([...selectedFocalPeople], '_id');
    const pages = uniq([...selectedPages]);

    remove(pages, item => item === page);

    focalPeople.forEach(focalPerson => {
      remove(
        selectedList,
        item => item._id === focalPerson._id // eslint-disable-line
      );
    });

    this.setState({
      selectedFocalPeople: selectedList,
      selectedPages: pages,
    });
  };

  /**
   * @function
   * @name handleFilterByStatus
   * @description Handle filter focalPeople by status action
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
   * @name handleOnDeselectFocalPerson
   * @description Handle deselect a single focalPerson action
   *
   * @param {object} focalPerson focalPerson to be removed from selected focalPeople
   * @returns {undefined} undefined
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleOnDeselectFocalPerson = focalPerson => {
    const { selectedFocalPeople } = this.state;
    const selectedList = [...selectedFocalPeople];

    remove(
      selectedList,
      item => item._id === focalPerson._id // eslint-disable-line
    );

    this.setState({ selectedFocalPeople: selectedList });
  };

  render() {
    const {
      focalPeople,
      loading,
      page,
      total,
      onEdit,
      onFilter,
      onNotify,
      onShare,
      onBulkShare,
    } = this.props;
    const { selectedFocalPeople, selectedPages } = this.state;
    const selectedFocalPeopleCount = intersectionBy(
      selectedFocalPeople,
      focalPeople,
      '_id'
    ).length;

    return (
      <Fragment>
        {/* toolbar */}
        <Toolbar
          itemName="focal person"
          page={page}
          total={total}
          selectedItemsCount={selectedFocalPeopleCount}
          exportUrl={getFocalPeopleExportUrl({
            filter: { _id: map(selectedFocalPeople, '_id') },
          })}
          onFilter={onFilter}
          onNotify={() => onNotify(selectedFocalPeople)}
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
          onShare={() => onBulkShare(selectedFocalPeople)}
        />
        {/* end toolbar */}

        {/* focalPerson list header */}
        <ListHeader
          headerLayout={headerLayout}
          onSelectAll={this.handleSelectAll}
          onDeselectAll={this.handleDeselectAll}
          isBulkSelected={selectedPages.includes(page)}
        />
        {/* end focalPerson list header */}

        {/* focalPeople list */}
        <List
          loading={loading}
          dataSource={focalPeople}
          renderItem={focalPerson => (
            <FocalPersonsListItem
              key={focalPerson._id} // eslint-disable-line
              abbreviation={focalPerson.abbreviation}
              location={compact([
                focalPerson.location.name,
                focalPerson.location.place.district,
                focalPerson.location.place.region,
                focalPerson.location.place.country,
              ]).join(', ')}
              name={focalPerson.name}
              agency={focalPerson.party ? focalPerson.party.name : 'N/A'}
              agencyAbbreviation={
                focalPerson.party ? focalPerson.party.abbreviation : 'N/A'
              }
              role={focalPerson.role ? focalPerson.role.name : 'N/A'}
              email={focalPerson.email}
              mobile={focalPerson.mobile}
              isSelected={
                // eslint-disable-next-line
                map(selectedFocalPeople, item => item._id).includes(
                  focalPerson._id // eslint-disable-line
                )
              }
              onSelectItem={() => {
                this.handleOnSelectFocalPerson(focalPerson);
              }}
              onDeselectItem={() => {
                this.handleOnDeselectFocalPerson(focalPerson);
              }}
              onEdit={() => onEdit(focalPerson)}
              onArchive={() =>
                deleteFocalPerson(
                  focalPerson._id, // eslint-disable-line
                  () => {
                    notifySuccess('Focal Person was archived successfully');
                  },
                  () => {
                    notifyError(
                      'An Error occurred while archiving Focal Person please contact system administrator'
                    );
                  }
                )
              }
              onShare={() => {
                onShare(focalPerson);
              }}
            />
          )}
        />
        {/* end focalPeople list */}
      </Fragment>
    );
  }
}

export default FocalPersonsList;
