<template>
  <header class="header">
    <div class="nav-container">
      <!-- Logo links -->
      <div class="logo-area">
        <img src="@/assets/Logo.png" alt="GameLog Logo" class="logo" />
      </div>

      <!-- Navigation rechts -->
      <nav class="nav">
        <ul>
          <router-link to="/">Home</router-link>
          <router-link to="/games">Games</router-link>
          <router-link to="/about">About</router-link>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>
