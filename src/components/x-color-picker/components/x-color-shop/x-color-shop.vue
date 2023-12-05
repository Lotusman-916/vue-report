<script setup lang="ts">
import { ref } from 'vue'

const classNames = ref('')
</script>

<template>
  <div :class="['color-shop', classNames]"></div>
</template>

<style lang="scss" scoped></style>
