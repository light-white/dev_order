import analysis from './zh-TW/analysis';
import exception from './zh-TW/exception';
import form from './zh-TW/form';
import globalHeader from './zh-TW/globalHeader';
import login from './zh-TW/login';
import menu from './zh-TW/menu';
import monitor from './zh-TW/monitor';
import result from './zh-TW/result';
import settingDrawer from './zh-TW/settingDrawer';
import settings from './zh-TW/settings';
import pwa from './zh-TW/pwa';

export default {
  'navBar.lang': '語言',
  'layout.user.link.help': '幫助',
  'layout.user.link.privacy': '隱私',
  'layout.user.link.terms': '條款',
  'app.home.introduce': '介紹',
  'app.forms.basic.title': '基礎表單',
  'app.forms.basic.description':
    '表單頁用於向用戶收集或驗證信息，基礎表單常見於數據項較少的表單場景。',
  ...analysis,
  ...exception,
  ...form,
  ...globalHeader,
  ...login,
  ...menu,
  ...monitor,
  ...result,
  ...settingDrawer,
  ...settings,
  ...pwa,
  'menu.index': '首頁',
  'menu.member': '用戶信息',
  'menu.member.search': '用戶搜索',
  'menu.order': '訂單管理',
  'menu.order.order_list': '訂單列表',
  'menu.balance': '余額管理',
  'menu.balance.balance_item': '余額詳情',
};
