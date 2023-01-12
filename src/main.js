import Vue from 'vue'
import App from './App'
import store from '@/store'

import 'dayjs/locale/zh-cn'
import * as dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import RelativeTime from 'dayjs/plugin/relativeTime'
import isoWeek from 'dayjs/plugin/isoWeek'
import uView from 'uview-ui'

import { navigateTo, navigateBack } from '@/utils/navigate';
import filters from '@/utils/filters';

// 设置dayjs语言
dayjs.locale('zh-cn')
dayjs.extend(duration);
dayjs.extend(RelativeTime);
dayjs.extend(isoWeek);

Vue.prototype.$navigateTo = navigateTo;
Vue.prototype.$navigateBack = navigateBack;
Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(filters);
Vue.use(uView);


const app = new Vue({
  ...App,
  store,
  router: ROUTES,
})
app.$mount()
