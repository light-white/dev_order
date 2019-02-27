import { searchMember } from '../../services/member/member';

export default {
  namespace: 'Member',
  state: {
    mode: 'view',
    member: {},
  },
  effects: {
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

    * fetch({ payload }, { call, put }) {
      yield put({ type: 'switchLoading' });
      const response = yield call(searchMember, payload);
      yield put({
        type: 'memberItem',
        payload: {
          mode: 'search',
          ...response,
        },
      })
      yield put({ type: 'switchLoading' });
    },
  },
  reducers: {
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

