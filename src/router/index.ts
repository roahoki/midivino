import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PetsView from '../views/PetsView.vue'
import AdoptView from '@/views/AdoptView.vue'
import CreatePetView from '@/views/CreatePetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/pets', name: 'pets', component: PetsView },
    { path: '/adopt', name: 'adopt', component: AdoptView },
    { path: '/create-pet', name: 'create-pet', component: CreatePetView },
  ],
});

export default router
