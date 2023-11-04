import { createRouter, createWebHistory } from 'vue-router'
// import type { RouteRecordRaw } from 'vue-router'
// import components from '../Layout/index.vue'
import Vue from 'vue';
import VueRouter from 'vue-router';
import {Layout} from "ant-design-vue";

const routes=[
            {
                path: '/',
                component:Layout,
                redirect: '/',
                children: [
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
                path: '/post',
                name: 'post',
                component: () => import('@/views/post.vue')
            },

            {
                path: '/:pathMatch(.*)*',
                name: 'not-found',
                component: () => import('@/views/not-found/not-found.vue')
            }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
