<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'accent' }
})

const emit = defineEmits(['click'])

const buttonClass = `btn btn-${props.variant}`
</script>

<template>
  <button
    :type="type"
    :class="buttonClass"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
