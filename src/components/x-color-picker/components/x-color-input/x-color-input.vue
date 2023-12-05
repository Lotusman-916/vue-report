<script setup lang="ts">
import { onUpdated, ref } from 'vue'
import type { TinyColor } from '@ctrl/tinycolor'
import { useColor } from '../../hooks/useColor'

const props = defineProps<{
  value: TinyColor
  className?: string
}>()

const emit = defineEmits(['onChanges'])

const { isValidateColorStr, transformColor, formatAlphaString } = useColor()

const currentHex = ref('')
const currentAlpha = ref(0)
const blurHex = ref('')
const blurAlpha = ref(0)
let focusHex = false
let focusAlpha = false

onUpdated(() => {
  const hex = formatHexString(props.value.toHexString())
  const alpha = props.value.getAlpha()
  if (!focusHex) {
    currentHex.value = hex
    blurHex.value = hex
  } else {
    blurHex.value = hex
  }
  if (!focusAlpha) {
    currentAlpha.value = alpha
    blurAlpha.value = alpha
  } else {
    blurAlpha.value = alpha
  }
})

const handleHexKeydown = (e: any) => {}

const handleHexKeyup = (e: any) => {
  const stringValue = String(e.target.value)

  if (isValidateColorStr(stringValue)) {
    currentHex.value = stringValue

    emit('onChanges', {
      color: transformColor(currentHex.value, currentAlpha.value),
      e,
    })
  }
}

const handleHexFocus = () => {
  focusHex = true
}

const handleHexOnBlur = () => {
  focusHex = false
  currentHex.value = blurHex.value
}

const formatAlpha = (alpha: number) => {
  return formatAlphaString(alpha)
}

const handleAlphaKeydown = (e: any) => {
  const num = toAlphaNum(String(e.target.value))
  if (num > -1 && num < 100) {
    const amount = 1
    // Up
    if (e.keyCode === 38) {
      currentAlpha.value = (num + amount) / 100
    }
    // Down
    if (e.keyCode === 40) {
      currentAlpha.value = (num - amount) / 100
    }
    emit('onChanges', {
      color: transformColor(currentHex.value, currentAlpha.value),
      e,
    })
  }
}

const handleAlphaKeyup = (e: any) => {
  if (e.keyCode === 40 || e.keyCode === 38) {
    return
  }
  const num = toAlphaNum(String(e.target.value))
  if (num > -1 && num < 100) {
    currentAlpha.value = num / 100
    emit('onChanges', {
      color: transformColor(currentHex.value, currentAlpha.value),
      e,
    })
  }
}

const handleAlphaFocus = () => {
  focusAlpha = true
}

const handleAlphaOnBlur = () => {
  focusAlpha = false
  currentAlpha.value = blurAlpha.value
}

// 格式化hex的色值
const formatHexString = (hex: string): string => {
  return hex.replace(/^#/, '').toUpperCase()
}

// 转化alpha值
const toAlphaNum = (alpha: string): number => {
  const num = Number(alpha.replace(/%$/, ''))
  return isNaN(num) ? -1 : num
}
</script>

<template>
  <div class="x-color-input">
    <span>HEX</span>
    <a-input
      class="color-hex-input"
      v-model="currentHex"
      @keydown="handleHexKeydown"
      @keyup="handleHexKeyup"
      @focus="handleHexFocus"
      @blur="handleHexOnBlur"
    ></a-input>
    <a-input
      class="color-alpha-input"
      :model-value="formatAlpha(currentAlpha)"
      @keydown="handleAlphaKeydown($event)"
      @keyup="handleAlphaKeyup($event)"
      @focus="handleAlphaFocus()"
      @focusout="handleAlphaOnBlur()"
    ></a-input>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/themes/mixin.scss';

.fone-color-input {
  display: flex;
  width: 100%;

  & > span {
    @include caption3();
    color: $color-black_text1-3;
  }

  .ant-input {
    font-size: 12px;
    padding: 3px 4px 3px 7px;
  }

  .color-hex-input {
    flex: 1;
    margin: 0 4px 0 10px;
    height: 24px;
  }

  .color-alpha-input {
    width: 44px;
    height: 24px;
  }
}
</style>
