import {
  Connect,
  getItems,
  searchItems,
  openItemForm,
  closeItemForm,
  selectItem,
} from '@codetanzania/emis-api-states';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Topbar from '../../../components/Topbar';
import UnitOfMeasureList from './List';
import ItemUnitOfMeasureForm from './Form';
import './styles.css';

/**
 * @class
 * @name ItemUnitOfMeasure
 * @description Render Item unit of measure module which has search box,
 *  actions and list of Item unit of measures
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemUnitOfMeasure extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    unitofmeasures: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string })
    ).isRequired,
    unitofmeasure: PropTypes.shape({ name: PropTypes.string }),
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    searchQuery: PropTypes.string,
    showForm: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    searchQuery: undefined,
    unitofmeasure: null,
  };

  state = {
    isEditForm: false,
  };

  componentDidMount() {
    getItems();
  }

  /**
   * @function
   * @name openForm
   * @description Open role form
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openItemForm();
  };

  /**
   * @function
   * @name openForm
   * @description close role form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeForm = () => {
    closeItemForm();
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name handleEdit
   * @description Handle on Edit action for list item
   *
   * @param {Object} value - item to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = value => {
    selectItem(value);
    this.setState({ isEditForm: true });
    openItemForm();
  };

  /**
   * @function
   * @name handleAfterCloseForm
   * @description Performs after close form cleanups
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  /**
   * @function
   * @name searchRoles
   * @description Search item unit of measure List based on supplied filter word
   *
   * @param {Object} event - Event instance
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  searchItemUnitOfMeasure = event => {
    searchItems(event.target.value);
  };

  render() {
    const {
      unitofmeasures,
      loading,
      showForm,
      posting,
      page,
      total,
      unitofmeasure,
      searchQuery,
    } = this.props;
    const { isEditForm } = this.state;
    return (
      <Fragment>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for Item unit of measure here ...',
            onChange: this.searchItemUnitOfMeasure,
            value: searchQuery,
          }}
          actions={[
            {
              label: 'New Unit Of Measure',
              icon: 'plus',
              size: 'large',
              title: 'Add New Item Unit Of Measure',
              onClick: this.openForm,
            },
          ]}
        />
        {/* end Topbar */}
        <div className="UnitOfMeasureList">
          {/* list starts */}
          <UnitOfMeasureList
            unitofmeasures={unitofmeasures}
            loading={loading}
            total={total}
            page={page}
            onEdit={this.handleEdit}
          />
          {/* end list */}

          {/* create/edit form modal */}
          <Modal
            title={
              isEditForm
                ? 'Edit Item Unit Of Measure'
                : 'Add New Item Unit Of Measure'
            }
            visible={showForm}
            footer={null}
            onCancel={this.closeForm}
            destroyOnClose
            maskClosable={false}
            afterClose={this.handleAfterCloseForm}
          >
            <ItemUnitOfMeasureForm
              posting={posting}
              isEditForm={isEditForm}
              unitofmeasure={unitofmeasure}
              onCancel={this.closeForm}
            />
          </Modal>
          {/* end create/edit form modal */}
        </div>
      </Fragment>
    );
  }
}

export default Connect(ItemUnitOfMeasure, {
  unitofmeasures: 'items.list',
  unitofmeasure: 'items.selected',
  loading: 'items.loading',
  page: 'items.page',
  showForm: 'items.showForm',
  total: 'items.total',
  searchQuery: 'items.q',
});
