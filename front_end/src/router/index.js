import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      
      path: '/product/:id',
      name: 'card_view',
      component: () => import('../views/CardView.vue')
    },
    {
      
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    }
  ],
})

export default router
