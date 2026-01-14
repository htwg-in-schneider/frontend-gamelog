<template>
  <header class="header">
    <div class="nav-container">
      <div class="logo-area">
        <img src="@/assets/Logo.png" alt="GameLog Logo" class="logo" />
      </div>

      <nav class="nav">
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/games">Games</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to= "/profile">Profile</router-link></li>
          <li><router-link to="/members">Members</router-link>
</li>
        </ul>

        <div class="auth-section" v-if="!isLoading">
          <button v-if="!isAuthenticated" @click="handleLogin" class="btn-login">
            Anmelden
          </button>

          <div v-else class="dropdown">
            <img :src="user.picture" :alt="user.name" class="user-pic" @click="toggleDropdown" />
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

const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0()

const dropdownOpen = ref(false)
const toggleDropdown = () => (dropdownOpen.value = !dropdownOpen.value)
const handleLogin = () => loginWithRedirect()
const handleLogout = () => logout({ logoutParams: { returnTo: window.location.origin } })
</script>

<style scoped>
.nav-container {
  display: flex;
  align-items: center;
  padding: 0 20px;
}

/* NAV als rechte Gruppe */
.nav {
  display: flex;
  align-items: center;
  width: 100%;
}

/* 🔥 Nav-Links nach rechts schieben */
.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0 20px 0 auto; /* auto = rechtsbündig */
  padding: 0;
}

/* Auth-Bereich direkt neben Nav-Links */
.auth-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Login Button */
.btn-login {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #0d6efd;
  color: white;
}

.btn-login:hover {
  background-color: #0b5ed7;
}

/* Profilbild */
.user-pic {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background: #1e1e1e;
  color: #fff;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  min-width: 140px;
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
  text-align: left;
  cursor: pointer;
  padding: 4px 0;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  color: #0d6efd;
}

.dropdown-menu hr {
  border: none;
  border-top: 1px solid #444;
  margin: 6px 0;
}

</style>
