import { stringify } from 'qs';
import request from '../../utils/request';

export async function searchOrderList(params) {
  return request(`/api/order_list/search?${stringify(params)}`);
}

export async function fetchOrderList(params) {
  return request(`/api/${params.id}/order_list?${stringify(params)}`);
}

export async function payOrder(params) {
  return request(`/api/order/${params.business_no}/pay`, { method: 'PUT' });
}
