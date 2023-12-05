<template>
  <div :class="['x-color-picker', classNames]">
    <!-- hex色值 -->
    <div class="x-picker-hex">
      <a-popover
        class="colorPopover"
        v-model="shopVisible"
        trigger="click"
        position="rt"
        :content="color"
        :popup-container="anchor"
        :style.backgroundColor="activeColorString()"
      >
        <div class="color-active"></div>
      </a-popover>
      <x-color-input :value="activeColor" @on-changes="handleInputChange"></x-color-input>
    </div>
    <!-- 颜色池  -->
    <div class="picker-predefined color-group">
      <template v-for="pColor of predefinedColors" :key="pColor">
        <div
          :class="{ 'color-block': true, isSelected: pColor.toLowerCase() === activeColorString() }"
          @click="handleBlockChange(pColor, $event)"
        >
          <!-- 选中颜色的icon -->
          <div class="color-bg" :style.backgroundColor="pColor" :style.color="getContrastingColor(pColor)">
            <svg>
              <use xlink:href="#check"></use>
            </svg>
          </div>
        </div>
      </template>
      <div class="shop-anchor" ref="anchor"></div>
    </div>
    <!-- 自定义色值 -->
    <div v-if="enableCustomizePanel" class="picker-customize">
      <div class="customize-label">自定义</div>
      <div class="customize-colors color-group" tabindex="4" @keydown="handleCustomizeKeydown"></div>
      <template v-for="cColor of customizeColors" :key="cColor">
        <div
          :attr.data-color="cColor"
          :class="{ 'color-block': true, selected: cColor.toLowerCase() === activeColorString() }"
          @click="handleBlockChange(cColor, $event)"
        >
          <div class="color-bg" :style.backgroundColor="cColor" :style.color="getContrastingColor(cColor)">
            <svg>
              <use xlink:href="#check"></use>
            </svg>
          </div>
        </div>
      </template>
      <a-popover
        class="colorPopover"
        v-model:popup-visible="shopVisible"
        trigger="click"
        position="rt"
        :content="color"
        :popup-container="anchor"
        @popup-visible-change="handleAddCustomVisibleChange"
        @click="handleAddCustomClick"
      >
        <a href="#">+</a>
      </a-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue'
import XColorInput from './components/x-color-input/x-color-input.vue'
import type { TinyColor } from '@ctrl/tinycolor'
import { predefinedColors } from './constant/x-color-picker'
import { useColor } from './hooks/useColor'

const props = withDefaults(
  defineProps<{
    predefinedColors?: string[]
    enableCustomizePanel: boolean
    customizeColors?: string[]
  }>(),
  {
    predefinedColors: predefinedColors,
    enableCustomizePanel: true,
    customizeColors: [],
  }
)

const { getContrastingColor } = useColor()
const classNames = ref('')
const shopVisible = ref(false)
const color = ref('')
const anchor = ref(null)
let activeColor: TinyColor

const activeColorString = (isHex = false) => {
  return activeColor[isHex ? 'toHexString' : 'toRgbString']()
}

const handleInputChange = () => {}

const handleBlockChange = (color: string, e: MouseEvent) => {}

const handleCustomizeKeydown = () => {}

const handleAddCustomVisibleChange = () => {}

const handleAddCustomClick = () => {}
</script>

<style lang="scss" scoped>
@import url(./styles/x-color-picker.scss);
</style>
