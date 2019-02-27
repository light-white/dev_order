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
  ...state.OrderList,
  currentUser: state.global.currentUser,
}))
export default class BalanceItem extends PureComponent {

  handleTableChange = async (pagination, filters, sorter) => {
    const params = {
      ...this.generateParam(),
      id: this.props.match.params.id,
      current: pagination.current,
      pageSize: pagination.pageSize,
    };
    await this.props.dispatch({
      type: 'OrderList/fetch',
      payload: params,
    });
  };

  searchOrder(payload) {
    this.props.dispatch({
      type: 'OrderList/fetch',
      payload: {
        ...this.generateParam(),
        ...payload,
        current: this.props.pagination.current,
        pageSize: this.props.pagination.pageSize,
      }
    })
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
    this.searchOrder()
  }

  pay_order = async (e, record) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'OrderList/pay_order',
      payload: {
        id: this.props.match.params.id,
        type: record.type,
        object_id: record.object_id,
      },
    })
    this.refresh()
  };

  refresh() {
    this.props.dispatch({
      type: 'OrderList/fetch',
      payload: {
        ...this.generateParam(),
        member_id: this.props.member_id,
        current: this.props.pagination.current,
        pageSize: this.props.pagination.pageSize,
      }
    })
  }

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

  renderOrderList() {
    const { list, loading, pagination, confirmLoading } = this.props;
    const columns = [
      {
        title: '订单号码',
        dataIndex: 'business_no',
      },
      {
        title: '订单时间',
        dataIndex: 'order_time',
      },
      {
        title: '订单状态',
        dataIndex: 'order_status',
      },
      {
        title: '操作',
        render: (text, record, index) => (
          list[index].order_status === '待支付' ? <a onClick={e => this.pay_order(e, record)}>支付</a> : ''
        )
      },
    ];
    return (
      list ? (<Card bordered={false}>
        <Table
          dataSource={list}
          columns={columns}
          pagination={pagination}
          onChange={this.handleTableChange}
          loading={loading}
          rowKey="business_no"
        />
      </Card>) : ''
    )
  }

  render() {
    return (
      <PageHeaderLayout>
        {this.renderSearchForm()}
        {this.renderOrderList()}
      </PageHeaderLayout>
    )
  }
}
