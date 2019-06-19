import { Button, Dropdown, Icon, Menu, Modal } from 'antd';
import { signout } from '@codetanzania/emis-api-states';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ChangePasswordForm from '../../../Auth/components/ChangePassword';
import './styles.css';

class UserMenu extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    visible: false,
    confirmLoading: false,
  };

  /* eslint-disable react/sort-comp */
  showModal = ({ key }) => {
    // open modal when change password item is clicked
    if (key === '1')
      this.setState({
        visible: true,
      });
  };

  /**
   * @function
   * @name signout
   * @description signout user from emis system
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  signout = () => {
    const { history } = this.props;
    signout();
    history.push('/signin');
  };

  menu = (
    <Menu className="UserProfileMenu">
      <Menu.Item key="1" onClick={this.showModal}>
        <Icon type="lock" />
        Change Password
      </Menu.Item>
      <Menu.Item key="2" onClick={() => this.signout()}>
        <Icon type="logout" />
        Sign Out
      </Menu.Item>
    </Menu>
  );

  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Modal
          title="Change Password"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          destroyOnClose
        >
          <ChangePasswordForm onCancel={this.handleCancel} />
        </Modal>
        <Dropdown overlay={this.menu}>
          <Button className="UserButton" icon="user" />
        </Dropdown>
      </div>
    );
  }
}

export default withRouter(UserMenu);
