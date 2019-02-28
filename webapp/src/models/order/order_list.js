import { searchOrderList, fetchOrderList, payOrder } from '../../services/order/order';
import { message } from 'antd';

export default {
  namespace: 'OrderList',
  state: {
    member_id: 0,
    list: [],
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
    },
  },
  effects: {
    *search({ payload }, { call, put }) {
      yield put({ type: 'switchLoading' });
      const response = yield call(searchOrderList, payload);
      yield put({
        type: 'memberOrderList',
        payload: {
          data: response.data,
          total: response.total,
          current: payload.current,
          pageSize: payload.pageSize,
          member_id: response.member_id,
        },
      });
      yield put({ type: 'switchLoading' });
    },
    *fetch({ payload }, { call, put }) {
      yield put({ type: 'switchLoading' });
      const response = yield call(fetchOrderList, payload);
      yield put({
        type: 'memberOrderList',
        payload: {
          data: response.data,
          total: response.total,
          current: payload.current,
          pageSize: payload.pageSize,
          member_id: response.member_id,
        },
      });
      yield put({ type: 'switchLoading' });
    },
    *pay_order({ payload }, { call, put }) {
      yield put({ type: 'switchLoading' });
      const response = yield call(payOrder, payload);
      if (response.result === true) {
        message.success('支付成功');
      } else {
        message.warning('支付失败');
      }
      yield put({ type: 'switchLoading' });
    },
  },
  reducers: {
    memberOrderList(state, { payload }) {
      const pager = { ...state.pagination };
      pager.total = payload.total;
      pager.current = payload.current;
      pager.pageSize = payload.pageSize;
      return {
        ...state,
        member_id: payload.member_id,
        list: payload.data,
        pagination: pager,
      };
    },
  },
};
