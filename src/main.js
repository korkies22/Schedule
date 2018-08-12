import Vue from 'vue'
import App from './App.vue'
import VueFlashMessage from 'vue-flash-message';
import VTooltip from 'v-tooltip'
import store from './store'

require('vue-flash-message/dist/vue-flash-message.min.css');

Vue.use(VTooltip);
Vue.use(VueFlashMessage);
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
