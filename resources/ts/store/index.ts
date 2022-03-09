import Vue from 'vue'
import Vuex from 'vuex'



import StoreSettings from "./modules/settings";
import StoreAnketaBuilder from "./modules/anketa/builder";
import StoreAnketa from "./modules/anketa/anketa";
import StoreAnketaQuestion from "./modules/anketa/question";
import StoreAnketaConverter from "./modules/anketa/converter";


Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        StoreSettings: StoreSettings,
        StoreAnketaBuilder: StoreAnketaBuilder,
        StoreAnketa: StoreAnketa,
        StoreAnketaQuestion: StoreAnketaQuestion,
        StoreAnketaConverter: StoreAnketaConverter
    }
})
