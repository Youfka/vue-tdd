import Vue from 'vue';
import { MdButton, MdTable, MdDialog, MdIcon, MdField, MdRipple, MdContent } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(MdButton);
Vue.use(MdTable);
Vue.use(MdDialog);
Vue.use(MdIcon);
Vue.use(MdField);
Vue.use(MdRipple);
Vue.use(MdContent);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
