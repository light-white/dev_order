import { stringify } from 'qs';
import request from '../../utils/request';


export async function searchMember(params) {
    return request(`/api/member?${stringify(params)}`);
}
