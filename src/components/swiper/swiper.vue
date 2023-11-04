<script setup lang="ts">
import { videosCtrolStore } from '../../service/video-control.ts'
import type { IVideoList } from '../../service/video_tab.ts'
import {
  watchEffect,
  type PropType,
  ref,
  onMounted
} from 'vue'
import { useElementSize, useThrottleFn } from '@vueuse/core'
import { useKeyboardNavigation } from '../../service/useKeyboardNavigation.ts'
defineProps({
  videoList: {
    type: Array as PropType<IVideoList[]>,
    default: []
  }
})

const isActiveIndex = (index: number) =>
    index === videosCtrolStore().activeVideoIndex

// 监听活动视频索引的变化，当变化时更新过渡时间   transition: 'transform 0.5s ease'
const transitionDuration = ref(0)

const videoHeight = ref()
const { height } = useElementSize(videoHeight)

watchEffect(() => {
  if (isActiveIndex(videosCtrolStore().activeVideoIndex)) {
    transitionDuration.value = 250 // 将过渡时间设置为250ms
  } else {
    transitionDuration.value = 0 // 将过渡时间重新设置为0ms
  }
  videosCtrolStore().initTranslateY = height.value + 12
})

const debouncedNext = useThrottleFn(() => {
  if (!videosCtrolStore().stopScroll) {
    videosCtrolStore().handleNext()
  }
}, 2000) // 1000 毫秒的防抖延迟
const debouncedPrev = useThrottleFn(() => {
  videosCtrolStore().handlePrev()
}, 2000) // 1000 毫秒的防抖延迟

onMounted(() => {
  window.addEventListener('wheel', handleWheel)
})
const handleWheel = (event: WheelEvent) => {
  const delta = event.deltaY
  // console.log(delta)
  setTimeout(() => {}, 200)
  if (delta > 0) {
    // 向下滚动
    debouncedNext() // 触发向下切换的防抖函数
  } else if (delta < 0) {
    // 向上滚动

    debouncedPrev() // 触发向上切换的防抖函数
  }
}

useKeyboardNavigation()
</script>

<template>
  <div class="carousel-controls">
    <div class="carousel-controls-switch">
      <div
          class="carousel-controls-switch-up"
          :class="{ disabled: videosCtrolStore().activeVideoIndex === 0 }"
          @click="videosCtrolStore().handlePrev()"
      >
        <svg-icon class="icon" icon="video-switch-prev-arrow" />
      </div>
      <div
          class="carousel-controls-switch-down"
          :class="{
          disabled: videosCtrolStore().stopScroll
        }"
          @click="
          videosCtrolStore().stopScroll === true
            ? null
            : videosCtrolStore().handleNext()
        "
      >
        <svg-icon class="icon" icon="video-switch-next-arrow" />
      </div>
    </div>
  </div>
  <div class="carousel" ref="videoHeight">
    <div
        class="carousel-inner"
        :style="{
        transform:
          'translate3d(0px,' + videosCtrolStore().translateY + 'px, 0px)',
        'transition-duration': `${transitionDuration}ms`
      }"
    >
      <div
          class="carousel-item"
          v-for="(item, index) in videoList"
          :key="item.id"
          :style="{
          height: `${height}px`,
          'margin-bottom': '12px'
        }"
          @mouseWheel="handleWheel"
      >
        <swiper-player
            :id="item.id"
            :username="item.userName"
            :uploadTime="item.uploadTime"
            :description="item.description"
            :url="item.videosAddress"
            :poster="item.videosCover"
            :img="item.userAvatar"
            :dianzan="item.likeCount"
            :comment="item.commentCount"
            :isLike="item.isLike"
            :isCollect="item.isCollect"
            :isAttention="item.isAttention"
            :isPlay="isActiveIndex(index)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-controls {
  width: 100%;
  height: 100%;

  .carousel-controls-switch {
    background-color: rgb(50, 52, 66);
    height: 80px;
    opacity: 0.7;
    position: relative;
    width: 36px;
    border-radius: 18px;
    &:hover {
      opacity: 0.9;
    }
    .carousel-controls-switch-up {
      height: 40px;
      position: absolute;
      top: 0px;
      width: 36px;
      cursor: pointer;
      opacity: 0.7;

      .icon {
        left: 5px;
        position: relative;
        top: 7px;
        height: 26px !important;
        width: 26px !important;
        color: #fff;
      }
    }
    .carousel-controls-switch-up.disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }
    .carousel-controls-switch-down.disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    .carousel-controls-switch-down {
      bottom: 0px;
      height: 40px;
      opacity: 0.7;
      position: absolute;
      width: 36px;
      cursor: pointer;

      .icon {
        left: 5px;
        position: relative;
        top: 7px;
        height: 26px !important;
        width: 26px !important;
        color: #fff;
      }
    }
  }
}
.carousel {
  position: absolute;
  left: 0;
  top: calc(0% + 12px);
  width: 100%;
  height: calc(100% - 24px);

  overflow: visible;
  padding-left: 30px;
  padding-right: 60px;
  .carousel-inner {
    width: 100%;
    height: 100%;
    .carousel-item {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      position: relative;
      flex-shrink: 0;
    }
    @media screen and (max-width: 1240px) {
      .carousel-item {
        min-width: 440px;
      }
    }
  }
}
</style>
