<script setup lang="ts">
import { ref } from 'vue'
import XSlider from '@/components/x-slider.vue'

// 组件数据
// const props = defineProps({})

// 字体数据
const fontData = {
  'font-sizes': [],
  'font-families': ['黑体', '宋体'],
}
const selectedFont: string = '' // 选中的字体
const selectedFontSize: number = 12 // 选中的字体大小
const isBold = false // 字体加粗是否按下
const isUnderLine = false // 下划线是否按下
const isTilt = false // 倾斜是否按下

// 加粗
const onBoldFont = () => {}
// 下划线
const onUnderLine = () => {}
// 斜线
const onTilt = () => {}
</script>

<template>
  <div class="x-style-toolbar">
    <x-slider
      :scroll-width="100"
      :each-step="50"
      icon-template="null"
      left-font-icon="null"
      right-font-icon="null"
      style-class="null"
    >
      <!-- 字体下拉菜单 -->
      <div class="group">
        <a-select v-model="selectedFont">
          <template v-for="font of fontData['font-families']">
            <a-option>{{ font }}</a-option>
          </template>
        </a-select>
      </div>
      <!-- 字号下拉菜单 -->
      <div class="group">
        <a-select v-model="selectedFontSize">
          <template v-for="font of fontData['font-sizes']">
            <a-option>{{ font }}</a-option>
          </template>
        </a-select>
      </div>
      <!-- 加粗，下划线， 斜体 -->
      <div class="group">
        <a-button type="text" @click="onBoldFont">加粗</a-button>
        <a-button type="text" @click="onUnderLine">下划线</a-button>
        <a-button type="text" @click="onTilt">斜体</a-button>
      </div>
      <!-- 背景取色，字体颜色 -->
      <div class="group">
        <a-button type="text">背景颜色</a-button>
        <a-button type="text">字体颜色</a-button>
      </div>
      <!-- 左对齐，居中对齐， 右对齐 -->
      <div class="group">
        <a-button type="text">左对齐</a-button>
        <a-button type="text">居中</a-button>
        <a-button type="text">右对齐</a-button>
      </div>
      <!-- 垂直对齐， 垂直居中对齐， 垂直底部对齐 -->
      <div class="group">
        <a-button type="text">顶部对齐</a-button>
        <a-button type="text">垂直居中对齐</a-button>
        <a-button type="text">垂直底部对齐</a-button>
      </div>
      <!-- 左缩进，右缩进 -->
      <div class="group">
        <a-button type="text">左缩进</a-button>
        <a-button type="text">右缩进</a-button>
      </div>
      <div class="group">
        <a-button type="text">只读</a-button>
        <a-button type="text">合并单元格</a-button>
        <a-button type="text">拆分单元格</a-button>
      </div>
    </x-slider>
  </div>
</template>

<style lang="scss" scoped></style>
