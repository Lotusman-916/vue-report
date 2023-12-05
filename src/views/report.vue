<script setup lang="ts">
import { ref, defineProps } from 'vue'
import XStyleToolbar from './components/x-style-toolbar/x-style-toolbar.vue'
const gridContainerRef = ref<HTMLElement>() // 容器
</script>

<template>
  <div class="x-grid-container" ref="gridContainerRef">
    <!-- 报表导航栏 -->
    <x-style-toolbar></x-style-toolbar>

    <!-- 表格的公式面板 -->
    <div class="grid-container-formula-panel"></div>

    <!-- 表格内容区域 -->
    <div class="grid-container-content"></div>

    <!-- sheet栏 -->
    <div class="grid-container-navigationBar"></div>

    <!-- 计算文本像素宽度 -->
    <div class="calcDom"></div>
  </div>
</template>

<style lang="scss" scoped>
.x-grid-container {
  height: 100%;
  width: 100%;
}
</style>
