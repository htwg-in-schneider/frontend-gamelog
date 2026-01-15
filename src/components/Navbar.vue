<template>
  <header class="header">
    <div class="nav-container">
      <!-- Logo -->
      <div class="logo-area">
        <img src="@/assets/Logo.png" alt="GameLog Logo" class="logo" />
      </div>

      <!-- 🍔 Burger (nur Mobile) -->
      <button class="burger" @click="mobileOpen = !mobileOpen">
        ☰
      </button>

      <!-- Navigation -->
      <nav class="nav" :class="{ open: mobileOpen }">
        <ul class="nav-links">
          <li><router-link to="/" @click="closeMobile">Home</router-link></li>
          <li><router-link to="/games" @click="closeMobile">Games</router-link></li>
          <li><router-link to="/about" @click="closeMobile">About</router-link></li>
          <li><router-link to="/members" @click="closeMobile">Members</router-link></li>
          <li v-if="isAuthenticated">
            <router-link to="/profile" @click="closeMobile">Profile</router-link>
          </li>
        </ul>

        <!-- Auth -->
        <div class="auth-section" v-if="!isLoading">
          <button
            v-if="!isAuthenticated"
            @click="handleLogin"
            class="btn-login"
          >
            Anmelden
          </button>

          <div v-else class="dropdown">
            <img
              :src="user.picture"
              :alt="user.name"
              class="user-pic"
              @click="toggleDropdown"
            />

            <ul v-show="dropdownOpen" class="dropdown-menu">
              <li><router-link to="/profile">Profil</router-link></li>
              <li><hr /></li>
              <li><button @click="handleLogout">Abmelden</button></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useRoute } from 'vue-router'

const {
  loginWithRedirect,
  logout,
  user,
  isAuthenticated,
  isLoading
} = useAuth0()

const route = useRoute()

const dropdownOpen = ref(false)
const mobileOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeMobile = () => {
  mobileOpen.value = false
}

const handleLogin = () => {
  loginWithRedirect({
    appState: {
      returnTo: route.fullPath
    },
    authorizationParams: {
      prompt: 'login'
    }
  })
}

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: import.meta.env.VITE_AUTH0_LOGOUT_URL
    }
  })
}
</script>


<style scoped>
.header {
  background: #1e1e1e;
}

.nav-container {
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: relative;
}

.logo {
  height: 40px;
}

/* Burger */
.burger {
  display: none;
  margin-left: auto;
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* Nav */
.nav {
  display: flex;
  align-items: center;
  width: 100%;
}

.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0 20px 0 auto;
  padding: 0;
  text-align: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  text-align: center;
}

.nav-links a:hover {
  color: #c2c2c2;
} 

/* Auth */
.auth-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-login {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #0d6efd;
  color: white;
  cursor: pointer;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.user-pic {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background: #1e1e1e;
  border-radius: 6px;
  padding: 10px;
  min-width: 140px;
  z-index: 1000;
  align-items: center;

}

.dropdown-menu li {
  list-style: none;
  margin: 6px 0;
}

.dropdown-menu a,
.dropdown-menu button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-align: center;
}
.dropdown-menu .btn-login {
  display: block;
  margin: 0 auto;      /* zentriert horizontal */
  text-align: center;
}

/*  MOBILE */
@media (max-width: 768px) {
  .burger {
    display: block;
  }

  .nav {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #1e1e1e;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    display: none;
  }

  .nav.open {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    margin: 0;
    width: 100%;
  }

  .auth-section {
    margin-top: 16px;
    width: 100%;
  }
}
</style>
