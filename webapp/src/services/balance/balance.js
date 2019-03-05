import request from '../../utils/request';


export async function searchBalance(params) {
    return request(`/api/${params.id}/balance`);
}

export async function rechargeBalance(params) {
    return request(`/api/${params.id}/balance`, {
        method: 'POST',
        body: {
            ...params,
        },
    });
}