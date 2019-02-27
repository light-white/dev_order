export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      { path: '/', redirect: '/index' },
      {
        path: '/index',
        name: 'index',
        hideInMenu: true,
        component: './HomePage',
      },
      {
        name: 'member',
        path: '/member',
        icon: 'user',
        routes: [
          {
            name: 'search',
            path: '/member/search',
            icon: 'user',
            component: './Member/MemberSearch',
          },
        ],
      },
      {
        name: 'order',
        path: '/order',
        icon: 'bars',
        routes: [
          {
            name: 'order_list',
            path: '/order/list',
            icon: 'bars',
            component: './Order/OrderList',
          },
        ],
      },
      {
        name: 'balance',
        path: '/balance',
        icon: 'wallet',
        routes: [
          {
            name: 'balance_item',
            path: '/balance/item',
            icon: 'wallet',
            component: './Balance/Balance',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
