import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from "../views/recommend";
import store from "@/store"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        meta: {
            headerfalg: false
        },
        component: recommend
    },
    {
        path: "/recommend/musiclist",
        meta: {
            headerfalg: true
        },
        component: () => import('../components/song.vue')
    },
    {
        path: '/rank',
        component: () => import("../views/rank")
    },
    {
        path: '/singer',
        component: () => import("../views/singer")
    },
    {
        path: '/search',
        meta: {
            headerfalg: true
        },
        component: () => import("../views/search")
    },
    {
        path: '/singer/singerList',
        meta: {
            headerfalg: true
        },
        component: () => import("../components/singerList")
    },
    {
        path: '/enshrine',
        meta: {
            headerfalg: true
        },
        component: () => import("../views/enshrine"),
        beforeEnter: (to, from, next) => {
            if (!store.state.user.login) {
                next('/login/register')
                return
            }
            next()
            console.log(to)
            console.log(from)
        }
    },
    {
        path: '/newmv',
        component: () => import("../views/newmv")
    },
    {
        path: '/bigplay',
        meta: {
            headerfalg: true
        },
        component: () => import("../components/bigplay")
    },
    {
        path: '/login',
        meta: {
            headernavfalg: true
        },
        redirect: '/login/register',
        component: () => import("../views/Login"),
        children: [
            {
                path: "register",
                meta: {
                    headernavfalg: true
                },
                component: () => import("../views/register"),
            },
            {
                path: "ringup",
                meta: {
                    headernavfalg: true
                },
                component: () => import("../views/ringup"),
            }
        ]
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
