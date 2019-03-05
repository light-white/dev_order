import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Radio, Input, Table, Form, Button, message, Row, Col, Select, Modal, Tabs } from 'antd';
import { routerRedux } from 'dva/router';
import { pickBy } from 'lodash'

import DescriptionList from '../../components/DescriptionList';
const { Description } = DescriptionList;
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

@Form.create()
@connect(state => ({
  ...state.Balance,
  currentUser: state.global.currentUser,
}))
export default class BalanceItem extends PureComponent {

  async searchBalance(payload) {
    await this.props.dispatch({
      type: 'Balance/fetch',
      payload: {
        ...this.generateParam(),
        ...payload,
      },
    });
    this.props.form.resetFields();
  }

  generateParam() {
    const { form } = this.props
    const formValues = form.getFieldsValue()
    const values = {}
    if (formValues.member_id) {
      values.member_id = parseInt(formValues.member_id)
    }
    if (formValues.url_token) {
      values.url_token = formValues.url_token
    }
    if (formValues.telephone) {
      values.telephone = formValues.telephone
    }
    if (formValues.email) {
      values.email = formValues.email
    }
    return {
      ...values,
    }
  }

  handleSearch = e => {
    e.preventDefault()
    this.searchBalance()
  }

  handleCancel = () => {
    this.props.dispatch({ type: 'Balance/hideModal' });
  };

  handleOk = async () => {
    const { validateFieldsAndScroll } = this.props.form;
    return validateFieldsAndScroll(async (error, values) => {
      if (!error) {
        await this.props.dispatch({
          type: 'Balance/recharge',
          payload: {
            type: parseInt(values.type.key),
            id: parseInt(values.price_member_id),
            price: parseFloat(values.price),
          },
        })
        this.handleCancel()
      }
    });
  };

  showModal = async () => {
    // 初始化form
    this.props.form.setFieldsValue({
      type: { key: '' },
      price_member_id: '',
      price: '',
    });
    this.props.dispatch({ type: 'Balance/showModal' })
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={{ md: 24, lg: 24, xl: 48 }}>
            <Col md={4} sm={24}>
              <FormItem>
                {getFieldDecorator('member_id')(<Input placeholder="member id" />)}
              </FormItem>
            </Col>
            <Col md={4} sm={24}>
              <FormItem>
                {getFieldDecorator('url_token')(<Input placeholder="url token" />)}
              </FormItem>
            </Col>
            <Col md={4} sm={24}>
              <FormItem>
                {getFieldDecorator('telephone')(<Input placeholder="telephone" />)}
              </FormItem>
            </Col>
            <Col md={4} sm={24}>
              <FormItem>
                {getFieldDecorator('email')(<Input placeholder="email" />)}
              </FormItem>
            </Col>
            <Col md={4} sm={24}>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  查询
              </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }

  renderBalanceItem() {
    const { balanceItem } = this.props
    return (
      <Card title="余额信息" style={{ marginBottom: 24 }} bordered={false}>
        {balanceItem ? (
          <DescriptionList style={{ margin: 24 }}>
            <DescriptionList style={{ marginBottom: 24 }}>
              <Description term="用户姓名">{balanceItem.name}</Description>
              <Description term="member_id">{balanceItem.member_id}</Description>
            </DescriptionList>
            <DescriptionList style={{ marginBottom: 24 }}>
              <Description term="余额">{balanceItem.balance}</Description>
              <Description term="知乎币">{balanceItem.icon}</Description>
            </DescriptionList>
          </DescriptionList>
        ) : ''}
      </Card>
    )
  }

  renderFooterToolbar() {
    const getButton = () => {
      return (
        <Button
          icon="plus"
          style={{ marginLeft: 20 }}
          type="primary"
          onClick={this.showModal}
        >
          充值
        </Button>
      );
    };
    return (
      <FooterToolbar children={getButton()} />
    )
  }

  renderBalanceModel() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { modalVisible } = this.props
    return (
      <Modal
        title={'充值'}
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <FormItem {...formItemLayout} label="充值类型">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: '请选择充值类型',
                  transform: ({ key }) => key,
                },
              ],
            })(
              <Select labelInValue placeholder='请选择充值类型'>
                <Option key="1">余额</Option>
                <Option key="2">知乎币</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="member id">
            {getFieldDecorator('price_member_id', {
              rules: [{ required: true, message: '填写 member_id' }],
            })(<Input placeholder="请输入 member_id" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="充值金额">
            {getFieldDecorator("price", {
              rules: [{ required: true, message: '填写充值金额' }]
            })(<Input placeholder="请输入充值金额" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  render() {
    return (
      <PageHeaderLayout>
        {this.renderSearchForm()}
        {this.renderBalanceItem()}
        {this.renderFooterToolbar()}
        {this.renderBalanceModel()}
      </PageHeaderLayout>
    )
  }
}
