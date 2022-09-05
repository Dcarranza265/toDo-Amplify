import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Amplify, * as AmplifyModules from 'aws-amplify';
import {AmplifyPlugin} from 'aws-amplify-vue';
// import '@aws-amplify/ui-vue';
import awsconfig from './aws-exports';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Amplify.configure(awsconfig);
Vue.use(AmplifyPlugin, AmplifyModules);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
