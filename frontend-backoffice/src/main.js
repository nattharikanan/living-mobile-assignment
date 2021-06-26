import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueDataTables from 'vue-data-tables/dist/data-tables.min.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/th'
Locale.use(enLocale);

Vue.use(VueDataTables)
Vue.use(ElementUI);
Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  render: h => h(App)
});

