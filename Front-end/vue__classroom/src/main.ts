import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Http from '@/utils/http';
import '@/mock/index';
import '@/style/index.scss';

Vue.prototype.$api = Http;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
