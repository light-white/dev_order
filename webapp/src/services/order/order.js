import request from '../../utils/request';


export async function fetchOrderList(params) {
    return {
        member_id: 123,
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
}


export async function payOrder(params) {
    return {
        result: true,
    }
}
