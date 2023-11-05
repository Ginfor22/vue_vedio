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
                        component: () => import('../components/find.vue')
                    },
                    {
                        path: '/',
                        name: 'recommend',
                        component: () => import('../components/recommed.vue')
                    },

                    {
                        path: '/user',
                        name: 'user',
                        redirect: '/user/self?showTab=like',
                        children: [
                            {
                                path: 'self',
                                component: () => import('../components/person.vue')
                            }
                        ]
                    }
                ]
            },
            {
                path: '/upload',
                name: 'upload',
                component: () => import('../components/upload.vue')
            },

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
