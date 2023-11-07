import { createRouter, createWebHistory } from 'vue-router'
// import type { RouteRecordRaw } from 'vue-router'
import layout from '../Layout/index.vue'
// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import {Layout} from "ant-design-vue";

const routes=[
            {
                path: '/',
                component:layout,
                redirect: '/',
                children: [
                    {
                        path: '/find',
                        name: 'find',
                        component: () => import('../interface/find.vue')
                    },
                    {
                        path: '/',
                        name: 'recommed',
                        component: () => import('../interface/recommed.vue')
                    },

                    {
                        path: '/user',
                        name: 'user',
                        redirect: '/user/self?showTab=like',
                        children: [
                            {
                                path: 'self',
                                component: () => import('../interface/person.vue')
                            }
                        ]
                    }
                ]
            },
            {
                path: '/upload',
                name: 'upload',
                component: () => import('../interface/upload.vue')
            },

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
