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
  ...state.Member,
  currentUser: state.global.currentUser,
}))
export default class MemberSearch extends PureComponent {
  componentDidMount() {
    this.initData()
  }

  initData(payload) {
    console.log(this.props.currentUser)
    this.props.dispatch({
      type: 'Member/init',
      payload: {
        ...this.generateParam(),
        ...payload,
      }
    })
  }

  searchMember(payload) {
    this.props.dispatch({
      type: 'Member/fetch',
      payload: {
        ...this.generateParam(),
        ...payload,
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
    this.searchMember()
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

  renderMemberItem() {
    const { member } = this.props
    return (
      member ?
        (<Card title="用户信息" style={{marginBottom: 24}} bordered={false}>
          <DescriptionList style={{marginBottom: 24}}>
            <Description
              term="用户姓名:">{member.fullname}</Description>
            <Description term="member_id:">{member.member_id}</Description>
            <Description term="url_token:">{member.url_token}</Description>
            <Description term="手机号码:">{member.phone_no}</Description>
            <Description term="email:">{member.email}</Description>
          </DescriptionList></Card>) :
        ''
    )
  }

  render() {
    return (
      <PageHeaderLayout>
        {this.renderSearchForm()}
        {this.renderMemberItem()}
      </PageHeaderLayout>
    )
  }
}
