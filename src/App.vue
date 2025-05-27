<template>
  <div v-if="!isLoading" class="flex flex-col min-h-screen">
    <header class="navbar bg-base-200 px-6 shadow-md">
      <!-- Logo -->
      <div class="flex-1">
        <RouterLink to="/" class="text-xl font-bold text-primary">MiDivino💜</RouterLink>
      </div>
  
      <!-- Menú horizontal (escritorio) -->
      <div class="hidden md:flex flex-none items-center space-x-3">
        <RouterLink to="/about" class="btn btn-ghost btn-sm">¿Cómo Adoptar?</RouterLink>
  
        <template v-if="isAuthenticated">
          <RouterLink to="/pets" class="btn btn-outline btn-sm">Adoptar</RouterLink>
          <RouterLink to="/create-pet" class="btn btn-outline btn-sm">Publicar</RouterLink>
          <button @click="handleLogout" class="btn btn-error btn-sm">Logout</button>
        </template>
  
        <template v-else>
          <button @click="handleLogin" class="btn btn-primary btn-sm">Login</button>
        </template>
      </div>
  
      <!-- Menú hamburguesa (móvil) -->
      <div class="md:hidden dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
  
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><RouterLink to="/about">¿Cómo Adoptar?</RouterLink></li>
  
          <template v-if="isAuthenticated">
            <li><RouterLink to="/pets">Adoptar</RouterLink></li>
            <li><RouterLink to="/create-pet">Publicar</RouterLink></li>
            <li><button @click="handleLogout">Logout</button></li>
          </template>
  
          <template v-else>
            <li><button @click="handleLogin">Login</button></li>
          </template>
        </ul>
      </div>
    </header>
  
    <main class="min-h-[calc(100vh-96px)] px-4 py-6 bg-base-100">
      <RouterView />
    </main>
  
    <footer class="footer footer-center p-4 bg-base-200 text-base-content">
      <p>divinos &copy; {{ new Date().getFullYear() }}</p>
    </footer>
  </div>

  <div v-if="isLoading" class="min-h-screen flex justify-center items-center">
    <span class="loading loading-spinner loading-lg text-primary"></span>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0()

function handleLogin() {
  loginWithRedirect()
}

function handleLogout() {
  logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>
