import request from '../../utils/request';


export async function searchMember(params) {
    return request(`/api/member`, {
        method: 'POST',
        body: {
            ...params,
        },
    });
}
