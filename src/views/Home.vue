<script setup>
import { useRouter } from 'vue-router'
import ContactForm from '@/components/ContactView.vue'

const router = useRouter()

function goToGames() {
  router.push('/games')
}
</script>

<template>
  <div class="page-content">
    <div class="hero">
      <h1>🎮 Willkommen bei GameLog</h1>
      <p class="subtitle">
        Entdecke Spiele und bewerte sie!
      </p>

      <button class="hero-btn" @click="goToGames">
        🚀 zu den Games
      </button>
    </div>

    <section class="contact-section">
  
      <ContactForm />
    </section>
  </div>
</template>


  <style scoped>
  .hero {
    text-align: center;
  }
  .hero-btn {
  margin-top: 28px;
  padding: 16px 36px;

  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;

  color: #fff;
  background: #0d6efd;
  border: none;
  border-radius: 14px;

  cursor: pointer;
  box-shadow:
    0 10px 30px rgba(13, 110, 253, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
}

/* Hover */
.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 14px 40px rgba(13, 110, 253, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Active (Click) */
.hero-btn:active {
  transform: translateY(0);
  box-shadow:
    0 6px 20px rgba(13, 110, 253, 0.3);
}

/* Mobile */
@media (max-width: 768px) {
  .hero-btn {
    width: 100%;
    max-width: 320px;
    font-size: 1.1rem;
    padding: 14px 28px;
  }
}

  </style>
