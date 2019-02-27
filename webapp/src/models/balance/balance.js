import { fetchOrderList } from '../../services/order/order';

export default {
  namespace: 'Balance',
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
    },
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      yield put({ type: 'switchLoading' });
      // const response = yield call(fetchOrderList, payload);
      const response = {
        data: [
          {
            business_no: 8299093046185282,
            order_time: '2019-01-15 23:08:13',
            order_status: '待支付',
          },
          {
            business_no: 4582919141843412,
            order_time: '2018-12-13 11:43:25',
            order_status: '已支付',
          },
          {
            business_no: 3703534733268876,
            order_time: '2018-10-23 13:22:48',
            order_status: '已支付',
          },
        ],
        total: 3,
      }
      yield put({
        type: 'orderList',
        payload: {
          data: response.data,
          total: response.total,
          current: payload.current,
          pageSize: payload.pageSize,
        },
      })
      yield put({ type: 'switchLoading' });
    },
    * init({ payload }, { call, put }) {
      yield put({ type: 'switchLoading' });
      yield put({
        type: 'memberItem',
        payload: {
          member: null,
        },
      })
      yield put({ type: 'switchLoading' });
    },

  },
  reducers: {
    orderList(state, { payload }) {
      const pager = { ...state.pagination }
      pager.total = payload.total;
      pager.current = payload.current;
      pager.pageSize = payload.pageSize;
      return {
        ...state,
        list: payload.data,
        pagination: pager,
      };
    },
    memberItem(state, { payload }) {
      return {
        ...state,
        mode: payload.mode,
        member: payload.fullname ? {
          fullname: payload.fullname,
          member_id: payload.old_id,
          url_token: payload.url_token,
          phone_no: payload.phone_no,
          email: payload.email,
        } : null,
      };
    },
  },
};

