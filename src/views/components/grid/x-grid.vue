<script lang="ts" setup>
import { ref } from 'vue'
const gridContainer = ref(null)
</script>

<template>
  <div class="grid-container" ref="gridContainer">
    <div class="grid-container-stylePanel" v-if="canStyleEdit"></div>
    <div class="grid-container-formulaPanel" v-if="canFormulaEdit"></div>
  </div>
</template>
