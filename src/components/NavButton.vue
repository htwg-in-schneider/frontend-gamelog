<template>
  <router-link :to="to" :class="buttonClass">
    <slot />
  </router-link>
</template>

<script setup>
const props = defineProps({
  to: { type: [String, Object], required: true },
  variant: { type: String, default: 'accent' }
});

const buttonClass = `btn btn-${props.variant}`;
</script>

<style scoped>
.btn {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: center;
}

.btn-accent {
  background-color: #0d6efd;
}

.btn-accent:hover {
  background-color: #0b5ed7;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
