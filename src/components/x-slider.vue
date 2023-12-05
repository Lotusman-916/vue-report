<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
const props = defineProps<{
  scrollWidth: number
  eachStep: number // 此属性必须为正整数
  leftFontIcon: string
  rightFontIcon: string
  styleClass: string
  iconTemplate: any
}>()
const showDirection = ref(false) //
const xSliderContainerRef = ref<HTMLElement>() // 滚动条容器元素

onMounted(() => {
  onResize()
})

onBeforeUnmount(() => {
  console.log(1111)
})

// 需要判断当前的步数是否小于0
const checkStepProperty = () => {
  if (!props.eachStep || props.eachStep < 0) {
    // props.eachStep = 5;
    console.log(new Error('步长不可以小于0'))
  }
}

watchEffect(() => {
  if (props.eachStep) {
    checkStepProperty()
  }
})

const onResize = (bDetechChange = false): void => {
  if (xSliderContainerRef.value) {
    if (xSliderContainerRef.value.scrollWidth > xSliderContainerRef.value.clientWidth) {
      showDirection.value = true
    } else {
      showDirection.value = false
    }
  }
  if (bDetechChange) {
    // 需要更新页面视图
    setTimeout(() => {})
  }
}

const onSlide = (direction: 'left' | 'right'): void => {
  let left = 0
  if (!xSliderContainerRef.value) return
  let step = props.eachStep
  let times = Math.ceil(props.scrollWidth / step)
  if (direction === 'left') {
    step = 0 - step
  }
  while (times) {
    setTimeout(() => {
      xSliderContainerRef.value?.scrollBy(step, 0)
    }, 1)
    times--
  }
}

const scrollToItem = (itemDom: HTMLElement) => {
  let containerDom = xSliderContainerRef.value
  let dom = itemDom
  if (containerDom && dom) {
    if (dom.offsetLeft < containerDom.scrollLeft) {
      dom.scrollIntoView()
    } else if (dom.offsetLeft + dom.clientWidth - containerDom.scrollLeft >= containerDom.clientWidth) {
      dom.scrollIntoView()
    }
  }
}
</script>

<template>
  <div
    :class="{
      'x-slider-div': true,
      styleClass: styleClass,
      'iconTemplate-container': iconTemplate,
      hasDirection: showDirection,
    }"
  >
    <div class="x-slider-container" :class="{ showDirection: showDirection }" ref="xSliderContainerRef">
      <slot></slot>
    </div>
    <div class="x-slider-direction" v-if="showDirection">
      <a href=""></a>
      <a href=""></a>
    </div>
    <div class="x-icon-container" v-if="iconTemplate"></div>
  </div>
</template>

<style lang="scss">
@import '../theme/mixin.scss';

.x-slider-div {
  height: 100%;
  .x-slider-container {
    max-width: 100%;
    height: 100%;
    float: left;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    -ms-overflow-style: none;
    display: flex;
    flex-wrap: nowrap;
  }
  &.iconTemplate-container {
    .icon-container {
      display: inline-block;
      width: 40px;
      height: 100%;
    }
    .x-slider-container.showDirection {
      max-width: calc(100% - 80px);
    }
  }
  .x-slider-container.showDirection {
    max-width: calc(100% - 40px);
  }
  .x-slider-container::-webkit-scrollbar {
    display: none;
  }
  .x-slider-direction {
    width: 40px;
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
    padding: 0px 2px;
    @include shadow-1_left;

    .arrow-icon {
      color: $color-black_text1-50;
      font-size: 16px;
      &.icon {
        height: 100%;
        svg {
          height: 100%;
          vertical-align: baseline;
        }
      }
      :hover {
        color: $color-brand1-6;
      }
    }
  }
}
</style>
