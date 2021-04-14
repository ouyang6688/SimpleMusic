import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        historySearch: [],
        musicData:{
            musicI:"",
            Musiclist:""
        },
        user:{
            username:"",
            password:"",
        }
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
        ADDMUSICDATA(state,data){
            state.musicData.musicI = data.index;
            state.musicData.Musiclist = data.list
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
        addmusicData({commit},data){
            commit("ADDMUSICDATA",data)
        }
    },
    modules: {}
})
