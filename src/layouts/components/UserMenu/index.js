import { Button, Dropdown, Icon, Menu, Modal } from 'antd';
import React from 'react';
import ChangePassword from '../../../Auth/components/ChangePassword';

class UserMenu extends React.Component {
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

  menu = (
    <Menu onClick={this.showModal}>
      <Menu.Item key="1">
        <Icon type="lock" />
        Change Password
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="logout" />
        Logout
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
    console.log('Clicked cancel button');
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
          okText="Update"
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <ChangePassword />
        </Modal>
        <Dropdown overlay={this.menu}>
          <Button style={{ marginLeft: 8, borderRadius: '50%' }} icon="user" />
        </Dropdown>
      </div>
    );
  }
}

export default UserMenu;
