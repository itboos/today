import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
    mpList: [],         // 搜索结果列表
    subscribeList: []   // 订阅列表
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})