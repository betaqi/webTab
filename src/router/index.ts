import { createRouter, createWebHistory } from 'vue-router'

export const defaultRouter = [
  // {
  //   path: '/',
  //   name: 'dashboard',
  //   component: () => import('@/views/layout/index.vue'),
  //   meta: {
  //     title: '首页',
  //     isShow: true,
  //     icon: 'i-mage:file-2',
  //   },
  //   children: [
  //     {
  //       path: 'home',
  //       name: 'home',
  //       component: () => import('@/views/home/index.vue'),
  //       meta: {
  //         title: '首页1',
  //         isShow: true,
  //         icon: 'i-mage:file-2',
  //       },
  //     },
  //     {
  //       path: 'dan',
  //       name: '单独',
  //       component: () => import('@/views/home/index.vue'),
  //       meta: {
  //         title: '单独1',
  //         isShow: true,
  //         icon: 'i-logos-vue',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: defaultRouter,
})

export default router
