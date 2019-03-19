import {
  Connect,
  openItemUnitForm,
  closeItemUnitForm,
  selectItemUnit,
  getItemUnits,
  searchItemUnits,
} from '@codetanzania/emis-api-states';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Topbar from '../../../components/Topbar';
import ItemUnitList from './List';
import ItemUnitForm from './Form';
import './styles.css';

/**
 * @class
 * @name ItemUnit
 * @description Render Item unit of measure module which has search box,
 *  actions and list of Item unit of measures
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class ItemUnit extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    posting: PropTypes.bool.isRequired,
    itemUnits: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
      .isRequired,
    itemUnit: PropTypes.shape({ name: PropTypes.string }),
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    searchQuery: PropTypes.string,
    showForm: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    searchQuery: undefined,
    itemUnit: null,
  };

  state = {
    isEditForm: false,
  };

  componentDidMount() {
    getItemUnits();
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
    openItemUnitForm();
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
    closeItemUnitForm();
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
    selectItemUnit(value);
    this.setState({ isEditForm: true });
    openItemUnitForm();
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
  searchItemUnit = event => {
    searchItemUnits(event.target.value);
  };

  render() {
    const {
      itemUnits,
      loading,
      showForm,
      posting,
      page,
      total,
      itemUnit,
      searchQuery,
    } = this.props;
    const { isEditForm } = this.state;
    return (
      <Fragment>
        {/* Topbar */}
        <Topbar
          search={{
            size: 'large',
            placeholder: 'Search for unit of measure here ...',
            onChange: this.searchItemUnit,
            value: searchQuery,
          }}
          actions={[
            {
              label: 'New Unit Of Measure',
              icon: 'plus',
              size: 'large',
              title: 'Add new unit of measure',
              onClick: this.openForm,
            },
          ]}
        />
        {/* end Topbar */}
        <div className="ItemUnitList">
          {/* list starts */}
          <ItemUnitList
            itemUnits={itemUnits}
            loading={loading}
            total={total}
            page={page}
            onEdit={this.handleEdit}
          />
          {/* end list */}

          {/* create/edit form modal */}
          <Modal
            title={
              isEditForm ? 'Edit unit of measure' : 'Add new unit of measure'
            }
            visible={showForm}
            footer={null}
            onCancel={this.closeForm}
            destroyOnClose
            maskClosable={false}
            afterClose={this.handleAfterCloseForm}
          >
            <ItemUnitForm
              posting={posting}
              isEditForm={isEditForm}
              itemUnit={itemUnit}
              onCancel={this.closeForm}
            />
          </Modal>
          {/* end create/edit form modal */}
        </div>
      </Fragment>
    );
  }
}

export default Connect(ItemUnit, {
  itemUnits: 'itemUnits.list',
  itemUnit: 'itemUnits.selected',
  loading: 'itemUnits.loading',
  page: 'itemUnits.page',
  showForm: 'itemUnits.showForm',
  total: 'itemUnits.total',
  searchQuery: 'itemUnits.q',
});
