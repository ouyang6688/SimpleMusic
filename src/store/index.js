import Vue from 'vue'
import Vuex from 'vuex'
// vuex数据持久化解决方案
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        historySearch: [],
        musicData: {
            musicI: "",
            Musiclist: ""
        },
        user: {
            phone: "",
            captcha: "",
            login: false
        },
        collect: [],
    },
    mutations: {
        ADDHISTORY(state, {data}) {
            state.historySearch.unshift(data)
            state.historySearch = Array.from(new Set(state.historySearch))
        },
        DELHISTORY(state, {i}) {
            state.historySearch.splice(i, 1)
        },
        DELALLHISTORY(state) {
            state.historySearch.splice(0)
        },
        ADDMUSICDATA(state, data) {
            state.musicData.musicI = data.index;
            state.musicData.Musiclist = data.list
        },
        ADDUSER(state, data) {
            state.user.phone = data.phone;
            state.user.captcha = data.captcha;
            state.user.login = true;
        },
        DELUSER(state) {
            state.user.phone = "";
            state.user.captcha = "";
            state.user.login = false;
        },
        ADDENSHRINE(state, {data}) {
            state.collect.push(data)
        }
    },
    actions: {
        addhistory({commit}, data) {
            commit("ADDHISTORY", {data})
        },
        delhistory({commit}, data) {
            commit("DELHISTORY", {data})
        },
        delallhistory({commit}, data) {
            commit("DELALLHISTORY", {data})
        },
        addmusicData({commit}, data) {
            commit("ADDMUSICDATA", data)
        },
        addUser({commit}, data) {
            commit("ADDUSER", data)
        },
        delUser({commit}) {
            commit('DELUSER')
        },
        addenshrine({commit}, data) {
            commit("ADDENSHRINE", {data})
        }
    },
    modules: {},
    plugins: [createPersistedState({storage: window.sessionStorage})]
})
