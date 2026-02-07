// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// On importera les composants plus tard
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/candidates',
    name: 'candidates',
    component: () => import('../views/CandidatesGalleryView.vue')
  },
  // {
  //   path: '/evenement',
  //   name: 'evenement',
  //   component: () => import('../views/EvenementView.vue')
  // },
  // {
  //   path: '/ticket',
  //   name: 'ticket',
  //   component: () => import('../views/TicketView.vue')
  // },
  {
    path: '/candidate/:id',
    name: 'candidate-profile',
    component: () => import('../views/CandidateProfileView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router