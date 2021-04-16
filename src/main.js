import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// import "assets/css/normalize.css";
import "amfe-flexible"
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
import './assets/font/iconfont.css'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
