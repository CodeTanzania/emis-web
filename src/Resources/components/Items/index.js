import {
  Connect,
  getItems,
  closeItemForm,
  openItemForm,
  selectItem,
  searchItems,
} from '@codetanzania/emis-api-states';
import { Input, Col, Row, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ItemsActionBar from './ActionBar';
import ItemsList from './List';
import ItemsFilters from './Filters';
import ItemForm from './Form';
import './styles.css';

const { Search } = Input;

/**
 * @class
 * @name Items
 * @description Render item list which have search box and actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class Items extends Component {
  state = {
    showFilters: false,
    isEditForm: false,
  };

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        description: PropTypes.string,
        color: PropTypes.string,
      })
    ).isRequired,
    item: PropTypes.shape({ name: PropTypes.string }),
    posting: PropTypes.bool.isRequired,
    showForm: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  };

  static defaultProps = {
    item: null,
  };

  componentDidMount() {
    getItems();
  }

  /**
   * @function
   * @name openFiltersModal
   * @description open filters modal by setting it's visible property
   * to false via state
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openFiltersModal = () => {
    this.setState({ showFilters: true });
  };

  /**
   * @function
   * @name closeFiltersModal
   * @description Close filters modal by setting it's visible property
   * to false via state
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  closeFiltersModal = () => {
    this.setState({ showFilters: false });
  };

  /**
   * @function
   * @name openForm
   * @description Open item form
   *
   * @returns {undefined} - Nothing is returned
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  openForm = () => {
    openItemForm();
  };

  /**
   * @function
   * @name closeForm
   * @description close item form
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
   * @param {Object} item item to be edited
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEdit = item => {
    selectItem(item);
    this.setState({ isEditForm: true });
    openItemForm();
  };

  /**
   * @function
   * @name handleAfterCloseForm
   * @description Handle after close actions
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleAfterCloseForm = () => {
    this.setState({ isEditForm: false });
  };

  render() {
    const { items, loading, total, page, showForm, posting, item } = this.props;
    const { showFilters, isEditForm } = this.state;
    return (
      <div className="Items">
        <Row>
          <Col span={12}>
            {/* search input component */}
            <Search
              size="large"
              placeholder="Search for items here ..."
              onChange={({ target: { value } }) => searchItems({ q: value })}
            />
            {/* end search input component */}
          </Col>

          {/* primary actions */}
          <Col span={3} offset={9}>
            <Button
              type="primary"
              icon="plus"
              size="large"
              title="Add New Item"
              onClick={this.openForm}
            >
              New Item
            </Button>
          </Col>
          {/* end primary actions */}
        </Row>

        {/* list action bar */}
        <ItemsActionBar
          total={total}
          page={page}
          onFilter={this.openFiltersModal}
        />
        {/* end list action bar */}

        {/* list starts */}
        <ItemsList items={items} loading={loading} onEdit={this.handleEdit} />
        {/* end list */}

        <Modal
          title="Filter Items"
          visible={showFilters}
          onCancel={this.closeFiltersModal}
          footer={null}
          destroyOnClose
          maskClosable={false}
        >
          <ItemsFilters onCancel={this.closeFiltersModal} />
        </Modal>

        {/* create/edit form modal */}
        <Modal
          title={isEditForm ? 'Edit Item' : 'Add New Item'}
          visible={showForm}
          footer={null}
          onCancel={this.closeForm}
          destroyOnClose
          maskClosable={false}
          afterClose={this.handleAfterCloseForm}
        >
          <ItemForm
            posting={posting}
            isEditForm={isEditForm}
            item={item}
            onCancel={this.closeForm}
          />
        </Modal>
        {/* end create/edit form modal */}
      </div>
    );
  }
}

export default Connect(Items, {
  items: 'items.list',
  loading: 'items.loading',
  item: 'items.selected',
  page: 'items.page',
  total: 'items.total',
  posting: 'items.posting',
  showForm: 'items.showForm',
});
