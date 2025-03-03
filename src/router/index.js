import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactListView from '../views/contact/ListView.vue'
import ContactCreateView from '../views/contact/CreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactListView
    },
    {
        path: '/contact/create',
        name: 'contact-create',
        component: ContactCreateView
      }
  ]
})

export default router