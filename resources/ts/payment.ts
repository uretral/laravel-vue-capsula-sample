import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from "vue-router";
// import store from "./store";
import HeyUI from "heyui";
import ru from './ru-Ru.js'

import VueLodash from 'vue-lodash'
import isEqual from 'lodash/isEqual'
import random from 'lodash/random'

const VueInputMask = require('vue-inputmask').default
Vue.use(VueInputMask)
Vue.use(HeyUI, {locale: ru})
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false

Vue.use(VueLodash, {name: 'custom', lodash: {isEqual, random}})

Vue.directive('number', {
    bind(el) {
        el.oninput = function (e) {
            if (!e.isTrusted) {
                return;
            }

            // @ts-ignore
            this.value = this.value.replace(/\D/g, '');
            el.dispatchEvent(new Event('input'));
        }
    },
});

import Root from "./views/Root.vue";
import StoreSettings from "./store/modules/settings";
import StoreLead from "./store/modules/lead/lead";
import {menu} from "./helpers";
import PaymentList from "./views/payment/PaymentList.vue";
import StorePayment from "./store/modules/payment/payment";
//***
const rootName = 'admin.payment'
const routes = [
    {
        path: '/admin/v/payment',
        name: rootName,
        component: Root,
        meta: {title: 'Список сделок', icon: 'icon-shuffle', menu: true},
        children: [
            {
                path: '', // страница по умолчинию
                name: `${rootName}.list`,
                component: PaymentList,
                meta: {title: 'Список сделок', icon: '', menu: true}
            },
        ]
    },

]
const router = new VueRouter({
    mode: 'history',
    routes: routes
})
//***
const store = new Vuex.Store({
    modules: {
        StoreSettings: StoreSettings,
        StoreLead: StoreLead,
        StorePayment: StorePayment
    }
})


const app = new Vue({
    el: '#app',
    store,
    components: {PaymentList},
    router
});

export const anketabuilderRoutes = menu(routes)
export const routeRootName = rootName
