import { searchMember } from '../../services/member/member';
import { searchBalance, rechargeBalance } from '../../services/balance/balance';
import { message } from 'antd';

export default {
  namespace: 'Balance',
  state: {
    balanceItem: null,
    modalVisible: false,
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      yield put({ type: 'switchLoading' });
      const member = yield call(searchMember, payload);
      const response = yield call(searchBalance, { id: member.old_id });
      yield put({
        type: 'balanceItem',
        payload: {
          fullname: response.fullname,
          member_id: response.member_id,
          balance: 0,
          icon: 12,
        },
      })
      yield put({ type: 'switchLoading' });
    },
    *recharge({ payload }, { call, put }) {
      yield put({ type: 'switchLoading' });
      const response = yield call(rechargeBalance, payload);
      if (response.result === 'success') {
        message.success('支付成功');
      } else {
        message.warning('支付失败');
      }
      yield put({ type: 'switchLoading' });
    },
    *showModal({ payload }, { put }) {
      yield put({
        type: 'showModalAction',
      });
    },
    *hideModal({ payload }, { put }) {
      yield put({
        type: 'switchLoading',
        payload: false,
      });
      yield put({
        type: 'hideModalAction',
      });
    },
  },
  reducers: {
    balanceItem(state, { payload }) {
      return {
        ...state,
        balanceItem: {
          name: payload.fullname,
          member_id: payload.member_id,
          balance: payload.balance,
          icon: payload.icon
        }
      };
    },
    showModalAction(state) {
      return {
        ...state,
        modalVisible: true,
      };
    },
    hideModalAction(state) {
      return {
        ...state,
        modalVisible: false,
      };
    },
  },
};

