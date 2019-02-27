import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Radio, Input, Table, Form, Button, message, Select, Modal } from 'antd';

import PageHeaderLayout from '../layouts/PageHeaderLayout';

@connect(state => ({
  currentUser: state.user.currentUser,
}))
export default class homePage extends PureComponent {

  render() {
    return (
      <Card bordered={false}>
        <div>
          <b>{this.props.currentUser.name}</b>, 欢迎使用测试平台
        </div>
      </Card>
    );
  }
}
