import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Radio,
  Input,
  Table,
  Form,
  Button,
  message,
  Row,
  Col,
  Select,
  Modal,
  Tabs,
} from 'antd';
import { routerRedux } from 'dva/router';
import { pickBy } from 'lodash';

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
export default class OrderList extends PureComponent {
  handleTableChange = async (pagination, filters, sorter) => {
    const params = {
      ...this.generateParam(),
      id: this.props.member_id,
      current: pagination.current,
      pageSize: pagination.pageSize,
    };
    await this.props.dispatch({
      type: 'OrderList/fetch',
      payload: params,
    });
  };

  async searchOrder(payload) {
    await this.props.dispatch({
      type: 'OrderList/search',
      payload: {
        ...this.generateParam(),
        ...payload,
      },
    });
    this.props.form.resetFields();
    this.refresh();
  }

  generateParam() {
    const { form } = this.props;
    const formValues = form.getFieldsValue();
    const values = {};
    if (formValues.member_id) {
      values.member_id = parseInt(formValues.member_id);
    }
    if (formValues.url_token) {
      values.url_token = formValues.url_token;
    }
    if (formValues.telephone) {
      values.telephone = formValues.telephone;
    }
    if (formValues.email) {
      values.email = formValues.email;
    }
    return {
      ...values,
    };
  }

  handleSearch = e => {
    e.preventDefault();
    this.searchOrder();
  };

  pay_order = async (e, record) => {
    e.preventDefault();
    this.props.dispatch({
      type: 'OrderList/pay_order',
      payload: {
        trade_no: record.trade_no,
      },
    });
    this.refresh();
  };

  refresh() {
    this.props.dispatch({
      type: 'OrderList/fetch',
      payload: {
        ...this.generateParam(),
        id: this.props.member_id,
        current: this.props.pagination.current,
        pageSize: this.props.pagination.pageSize,
      },
    });
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
              <FormItem>{getFieldDecorator('email')(<Input placeholder="email" />)}</FormItem>
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
    );
  }

  renderOrderList() {
    const { list, loading, pagination, confirmLoading } = this.props;
    const OrderStatusMap = {
      1: '已创建',
      20: '待支付',
      40: '已支付',
      60: '已完成',
      70: '退款',
      80: '退款',
      89: '自动关闭',
      99: '超时取消',
      109: '已删除',
    };
    const columns = [
      {
        title: '订单号码',
        dataIndex: 'trade_no',
      },
      {
        title: '订单时间',
        dataIndex: 'create_time',
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        render: (text, record) => OrderStatusMap[text],
      },
      {
        title: '操作',
        render: (text, record, index) =>
          list[index].status === 20 ? (
            <a onClick={e => this.pay_order(e, record)}>支付</a>
          ) : (
              ''
            ),
      },
    ];
    return list ? (
      <Card bordered={false}>
        <Table
          dataSource={list}
          columns={columns}
          pagination={pagination}
          onChange={this.handleTableChange}
          loading={loading}
          rowKey="trade_no"
        />
      </Card>
    ) : (
        ''
      );
  }

  render() {
    return (
      <PageHeaderLayout>
        {this.renderSearchForm()}
        {this.renderOrderList()}
      </PageHeaderLayout>
    );
  }
}
